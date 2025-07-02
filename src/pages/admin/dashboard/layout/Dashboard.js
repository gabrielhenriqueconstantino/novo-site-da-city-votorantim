import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Cards from '../components/Cards';
import AutoLogout from '../../AutoLogout';
import { Outlet } from 'react-router-dom';

import './Dashboard.css';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div className="dashboard-container">
      <AutoLogout />
      <Header />
      <div className={`dashboard-body${collapsed ? ' collapsed' : ''}`}>
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;