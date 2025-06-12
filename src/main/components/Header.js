import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ setShowItinerarios }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleItinerariosClick = () => {
    setShowItinerarios(true);
    closeMenu();
  };

  const handleHorariosClick = () => {
    setShowItinerarios(false);
    closeMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <nav className="nav">
          <div className="logo-container">
            <Link to="/horarios" onClick={handleHorariosClick}>
              <img 
                src="http://votorantim.citymais.com.br/wp-content/uploads/2020/07/logo-city3.png" 
                alt="Logo da CITY+" 
                className="logo-img"
              />
            </Link>
          </div>

          {/* Menu desktop */}
          <ul className="nav-links">
            <li>
              <NavLink 
                to="/horarios" 
                className={({ isActive }) => 
                  `nav-item ${isActive || location.pathname.startsWith('/horarios/') ? 'active' : ''}`
                }
                onClick={handleHorariosClick}
              >
                HORÁRIOS
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/itinerarios" 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={handleItinerariosClick}
              >
                ITINERÁRIOS
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/cadastro" 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                CADASTRO
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                FALE CONOSCO
              </NavLink>
            </li>
          </ul>

          {/* Menu hambúrguer (mobile) */}
          <div 
            className={`hamburger ${menuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>

        {/* Menu mobile */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            <li>
              <NavLink 
                to="/horarios" 
                end 
                onClick={handleHorariosClick}
                className={({ isActive }) => 
                  `mobile-nav-item ${isActive || location.pathname.startsWith('/horarios/') ? 'active' : ''}`
                }
              >
                HORÁRIOS
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/itinerarios" 
                onClick={handleItinerariosClick}
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              >
                ITINERÁRIOS
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/cadastro" 
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                CADASTRO
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                onClick={closeMenu}
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              >
                FALE CONOSCO
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;