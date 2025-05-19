// Componente do cabeçalho com navegação e menu hambúrguer para telas pequenas
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
        <img src="http://votorantim.citymais.com.br/wp-content/uploads/2020/07/logo-city3.png" alt="Logo da CITY+"></img>
          <Link to="/"></Link>
        </div>
          
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar bar1 ${menuOpen ? 'open' : ''}`}></span>
          <span className={`bar bar2 ${menuOpen ? 'open' : ''}`}></span>
          <span className={`bar bar3 ${menuOpen ? 'open' : ''}`}></span>
        </div>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <NavLink to="/" end onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}>
              HORÁRIOS
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}>
              ITINERÁRIOS
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}>
              CADASTRO
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}>
              FALE CONOSCO
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;