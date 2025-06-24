import React from "react";
import { Bell, User, ChevronDown, Search } from "lucide-react";
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="header-right">
        <button className="notification-button">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div>
          <div className="user-details">
            <span className="user-name">Gabriel Silva</span>
            <span className="user-role">Administrador</span>
          </div>
          <ChevronDown size={16} className="dropdown-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;