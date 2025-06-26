import React, { useState, useEffect } from "react";
import { Bell, User, ChevronDown, Mail, HelpCircle, LogOut } from "lucide-react";
import '../styles/Header.css';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState(null);

  const handleNotificationClick = (type) => {
    setActiveNotification(activeNotification === type ? null : type);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="dashboard-header">
      <div className="header-right">
        <button 
          className={`notification-button ${activeNotification === 'help' ? 'active' : ''}`}
          onClick={() => handleNotificationClick('help')}
        >
          <HelpCircle size={22} />
          <div className="notification-pulse"></div>
        </button>

        <button 
          className={`notification-button ${activeNotification === 'bell' ? 'active' : ''}`}
          onClick={() => handleNotificationClick('bell')}
        >
          <Bell size={22} />
          <span className="notification-badge">3</span>
          <div className="notification-pulse"></div>
        </button>

        <button 
          className={`notification-button ${activeNotification === 'mail' ? 'active' : ''}`}
          onClick={() => handleNotificationClick('mail')}
        >
          <Mail size={22} />
          <span className="notification-badge">7</span>
          <div className="notification-pulse"></div>
        </button>

        <button className="notification-button logout-button"
          onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                  }}
        >
          <LogOut size={22} />
        </button>
        
        <div 
          className={`user-profile ${isProfileOpen ? 'open' : ''}`}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div className="avatar">
            <User size={20} />
          </div>
          <div className="user-details">
            <span className="user-name">{user?.nome || "Usuário"}</span>
            <span className="user-role">{user?.role || "Cargo"}</span>
          </div>
          <ChevronDown 
            size={16} 
            className={`dropdown-icon ${isProfileOpen ? 'rotate' : ''}`} 
          />
          {isProfileOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-item">Meu Perfil</div>
              <div className="dropdown-item">Configurações</div>
              <div className="dropdown-divider"></div>
              <div
                className="dropdown-item logout"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                  }}
                >
                  Sair
                </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;