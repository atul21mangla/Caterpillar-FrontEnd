import express from 'express';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import jpeg from 'jpeg-js';
import jsQR from 'jsqr';

const app = express();
app.use(cors());

const SAVE_FOLDER = path.join(process.cwd(), 'qrimagesaved');
if (!fs.existsSync(SAVE_FOLDER)) fs.mkdirSync(SAVE_FOLDER, { recursive: true });
app.use('/qrimagesaved', express.static(SAVE_FOLDER));

const DROIDCAM_URL = 'http://10.163.13.85:4747/video';

app.get('/api/qrimage', async (req, res) => {
  try {
    const response = await axios.get(DROIDCAM_URL, {
      responseType: 'stream',
      headers: { 'Accept': 'multipart/x-mixed-replace' }
    });

    let found = false;
    let buffer = Buffer.alloc(0);

    response.data.on('data', async chunk => {
      if (found) return;
      buffer = Buffer.concat([buffer, chunk]);

      if (buffer.length > 10000) {
        const start = buffer.indexOf(Buffer.from([0xff, 0xd8])); // SOI
        const end = buffer.indexOf(Buffer.from([0xff, 0xd9]), start + 2); // EOI
        if (start !== -1 && end !== -1) {
          found = true;
          const jpegData = buffer.subarray(start, end + 2);

          const timestamp = Date.now();
          const filename = path.join(SAVE_FOLDER, `qrimage-${timestamp}.jpg`);
          fs.writeFileSync(filename, jpegData);
          console.log(`JPEG saved: ${filename}`);

          try {
            // Decode JPEG to raw RGBA
            const raw = jpeg.decode(jpegData, { useTArray: true }); 
            // jsQR expects Uint8ClampedArray
            const qrCode = jsQR(new Uint8ClampedArray(raw.data), raw.width, raw.height);

            if (qrCode) {
              console.log('QR code decoded:', qrCode.data);
              res.json({
                image: `/qrimagesaved/qrimage-${timestamp}.jpg`,
                qrResult: qrCode.data
              });
            } else {
              console.log('No QR code detected');
              res.json({
                image: `/qrimagesaved/qrimage-${timestamp}.jpg`,
                qrResult: null,
                error: 'No QR code detected'
              });
            }
          } catch (err) {
            console.error('QR decode error:', err);
            res.json({
              image: `/qrimagesaved/qrimage-${timestamp}.jpg`,
              qrResult: null,
              error: 'Failed to decode QR code'
            });
          }

          response.data.destroy();
        }
      }
    });

    response.data.on('end', () => {
      if (!found) res.status(500).send('No JPEG frame found in stream');
    });

    response.data.on('error', err => {
      res.status(500).send('Failed to fetch image from DroidCam');
    });

  } catch (err) {
    res.status(500).send('Failed to fetch image from DroidCam');
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
