// src/components/CheckInOut/QRModal.jsx
import React, { useState, useRef } from "react";


const PROXY_URL = 'http://localhost:5001/api/qrimage';

const QRModal = ({ isOpen, onClose, qrCodeUrl }) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const imgRef = useRef();

  if (!isOpen) return null;

  // Fetch image from backend and save
  const handleCapture = async () => {
    setLoading(true);
    try {
      const response = await fetch(PROXY_URL);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPhoto(url);
      // Trigger download
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      link.href = url;
      link.download = `qrimagesaved/qrimage-${timestamp}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Failed to capture image from DroidCam.');
    }
    setLoading(false);
  };

  // Inline rendering, not modal
  return (
    <div className="qr-inline-content" style={{ background: '#fff', borderRadius: 16, padding: '2rem 2.5rem', minWidth: 320, minHeight: 320, boxShadow: '0 8px 32px rgba(30,41,59,0.18)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button style={{ position: 'absolute', top: 16, right: 16, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer', fontSize: '1rem', zIndex: 10 }} onClick={onClose}>&times;</button>
      <h2>Scan QR Code</h2>
      <div style={{ marginBottom: '1rem', width: '100%' }}>
        <img
          ref={imgRef}
          src={PROXY_URL + '?t=' + Date.now()}
          alt="DroidCam Live"
          style={{ width: '100%', maxWidth: '320px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(30,41,59,0.10)' }}
        />
      </div>
      <button className="primary-btn" style={{ marginBottom: '1rem' }} onClick={handleCapture} disabled={loading}>
        {loading ? 'Capturing...' : 'Capture Frame'}
      </button>
      {photo ? (
        <img src={photo} alt="Captured" className="qr-modal-img" />
      ) : qrCodeUrl ? (
        <img src={qrCodeUrl} alt="QR Code" className="qr-modal-img" />
      ) : (
        <p>No QR code available.</p>
      )}
    </div>
  );
};

export default QRModal;