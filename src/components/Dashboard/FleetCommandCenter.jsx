// src/components/Dashboard/FleetCommandCenter.jsx
import React from 'react';
import { useState } from 'react';
import KPICards from './KPICards';
import LiveAssetList from './LiveAssetList';
import ConstructionMap from './ConstructionMap';
import QRModal from '../CheckInOut/QRModal';
import '../../styles/FleetCommandCenter.css';

const FleetCommandCenter = ({ onAssetSelect }) => {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="dashboard dashboard-flex" style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'flex-start' }}>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* QR Scan UI at top, inline */}
        <div style={{ marginBottom: '1rem' }}>
          <button className="primary-btn" onClick={() => setShowQR(v => !v)}>
            {showQR ? 'Close QR Scan' : 'Scan QR Code'}
          </button>
          {showQR && <QRModal isOpen={true} onClose={() => setShowQR(false)} />}
        </div>
        <LiveAssetList onAssetSelect={onAssetSelect} />
        <KPICards />
      </div>
      {/* Map is minimized by default, only shows as a floating button/modal */}
      <ConstructionMap onAssetSelect={onAssetSelect} />
    </div>
  );
};

export default FleetCommandCenter;