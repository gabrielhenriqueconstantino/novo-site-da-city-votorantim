import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaClock,
  FaBus,
  FaIdCard,
  FaHeadset,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

import '../styles/Sidebar.css';

const SidebarItem = ({ to, icon: Icon, label, collapsed, active }) => (
  <li className={`sidebar-item ${active ? 'active' : ''}`}>
    <Link to={to} className="sidebar-link">
      <div className="sidebar-icon-container">
        <Icon className="sidebar-icon" />
      </div>
      {!collapsed && <span className="sidebar-label">{label}</span>}
      {active && !collapsed && <div className="active-indicator" />}
    </Link>
  </li>
);

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const menuItems = [
    { to: "/admin", icon: FaHome, label: "Início" },
    { to: "/users", icon: FaClock, label: "Horários" },
    { to: "/reports", icon: FaBus, label: "Itinerários" },
    { to: "/reports", icon: FaIdCard, label: "Cartões" },
    { to: "/reports", icon: FaHeadset, label: "Reclamações" },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setInitialLoad(false);
  };

  useEffect(() => {
    // Abre a sidebar automaticamente após 500ms do carregamento
    const timer = setTimeout(() => {
      setCollapsed(false);
      setInitialLoad(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${initialLoad ? 'initial-load' : ''}`}>
      {/* Header da Sidebar */}
      <div className={`sidebar-header ${collapsed ? 'collapsed' : ''}`}>
        <div className="logo-container">
          <img
            src="https://votorantim.citymais.com.br/wp-content/uploads/2020/07/logo-city3.png"
            alt="Logo da Empresa"
            className="sidebar-logo"
          />
        </div>
        {!collapsed && (
          <div className="sidebar-header-titles">
            <h1 className="sidebar-title">Painel Administrativo</h1>
            <p className="sidebar-subtitle">Bem-vindo de volta, Gabriel</p>
          </div>
        )}
      </div>

      <div className="sidebar-content">
        <button onClick={toggleSidebar} className="sidebar-toggle">
          {collapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
        </button>
        
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              collapsed={collapsed}
              active={location.pathname === item.to}
            />
          ))}
        </ul>
        
        <div className="sidebar-footer">
          <Link to="/horarios" className="sidebar-link">
            <div className="sidebar-icon-container">
              <FaSignOutAlt className="sidebar-icon"
              onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                  }}
              />
            </div>
            {!collapsed && <span className="sidebar-label">Sair</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;