// src/components/Dashboard/KPICards.jsx
import React from 'react';
import '../../styles/KPICards.css';

const KPICards = () => {
  const kpiData = [
    { title: 'Total Assets Rented', value: 47, icon: '🚜' },
    { title: 'Utilization Rate', value: '85%', icon: '📊' },
    { title: 'Overdue Assets', value: 3, icon: '⚠️' },
    { title: 'Critical Alerts', value: 2, icon: '🔴' },
  ];

  return (
    <div className="kpi-grid">
      {kpiData.map((kpi, index) => (
        <div key={index} className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-title">{kpi.title}</div>
            <div className="kpi-icon">{kpi.icon}</div>
          </div>
          <div className="kpi-value">{kpi.value}</div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;