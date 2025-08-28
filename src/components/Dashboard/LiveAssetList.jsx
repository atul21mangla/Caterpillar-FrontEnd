// src/components/Dashboard/LiveAssetList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/LiveAssetList.css';

const LiveAssetList = ({ onAssetSelect }) => {
  const navigate = useNavigate();
  const assetData = [
    { id: 'CAT-789', name: 'Excavator 350', status: 'active', site: 'Construction Site A', returnDate: '2025-09-05' },
    { id: 'CAT-456', name: 'Bulldozer D6', status: 'idle', site: 'Mining Operation B', returnDate: '2025-09-02' },
    { id: 'CAT-123', name: 'Loader 521', status: 'active', site: 'Construction Site C', returnDate: '2025-09-10' },
    { id: 'CAT-987', name: 'Crane 210', status: 'maintenance', site: 'Depot', returnDate: '2025-09-15' },
    { id: 'CAT-654', name: 'Excavator 380', status: 'active', site: 'Construction Site A', returnDate: '2025-09-08' },
    { id: 'CAT-321', name: 'Bulldozer D7', status: 'idle', site: 'Mining Operation B', returnDate: '2025-09-03' },
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'active': return 'status-active';
      case 'idle': return 'status-idle';
      case 'maintenance': return 'status-error';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'Active';
      case 'idle': return 'Idle';
      case 'maintenance': return 'Maintenance';
      default: return status;
    }
  };

  // Helper to check if asset is overdue
  const isOverdue = (returnDate) => {
    const today = new Date();
    const due = new Date(returnDate);
    return due < today;
  };

  // Helper to check anomaly (idle/maintenance for >2 days)
  const isAnomaly = (status, returnDate) => {
    if (status === 'idle' || status === 'maintenance') {
      const today = new Date();
      const due = new Date(returnDate);
      // If return date is more than 2 days away, flag as anomaly
      return (due - today) / (1000*60*60*24) > 2;
    }
    return false;
  };

  return (
    <div className="asset-list">
      <h2>Live Asset List</h2>
      <table className="asset-table">
        <thead>
          <tr>
            <th>Equipment ID</th>
            <th>Status</th>
            <th>Current Site</th>
            <th>Return Date</th>
            <th>Alerts</th>
          </tr>
        </thead>
        <tbody>
          {assetData.map(asset => (
            <tr
              key={asset.id}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (onAssetSelect) onAssetSelect(asset);
                navigate('/asset-detail');
              }}
            >
              <td>
                <strong>{asset.id}</strong>
                <div style={{ fontSize: '0.9rem', color: '#7a7a7a' }}>{asset.name}</div>
              </td>
              <td>
                <span className={`status-indicator ${getStatusClass(asset.status)}`}></span>
                {getStatusText(asset.status)}
              </td>
              <td>{asset.site}</td>
              <td>{asset.returnDate}</td>
              <td>
                {isOverdue(asset.returnDate) && (
                  <span className="alert-badge overdue">Overdue</span>
                )}
                {isAnomaly(asset.status, asset.returnDate) && (
                  <span className="alert-badge anomaly">Anomaly</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveAssetList;