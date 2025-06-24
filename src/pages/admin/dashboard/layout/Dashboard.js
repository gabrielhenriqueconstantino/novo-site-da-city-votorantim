import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './Dashboard.css';

const Dashboard = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-body">
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <main className={`main-content ${collapsed ? 'collapsed' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;