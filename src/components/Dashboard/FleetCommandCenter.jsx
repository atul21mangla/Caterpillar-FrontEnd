// src/components/Dashboard/FleetCommandCenter.jsx
import React from 'react';
// import MapView from './MapView';
import KPICards from './KPICards';
import LiveAssetList from './LiveAssetList';
import ConstructionMap from './ConstructionMap';
import '../../styles/FleetCommandCenter.css';

const FleetCommandCenter = ({ onAssetSelect }) => {
  return (
    <div className="dashboard dashboard-flex" style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'flex-start' }}>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <LiveAssetList onAssetSelect={onAssetSelect} />
        <KPICards />
      </div>
      {/* Map is minimized by default, only shows as a floating button/modal */}
      <ConstructionMap onAssetSelect={onAssetSelect} />
    </div>
  );
};

export default FleetCommandCenter;