// src/components/Footer.js
import React from 'react';
import { FaLock } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>Sobre Nós</h3>
          <p>CITY+ Votorantim - Conectando você com a cidade com segurança e pontualidade.</p>
        </div>

        <div className="footer-section">
          <h3>Contato</h3>
          <p><i className="fas fa-map-marker-alt"></i> Av. Dr. Armando Pannunzio, 2085</p>
          <p><i className="fas fa-phone"></i> (15) 93300-1483</p>
          <p><i className="fas fa-clock"></i> Seg. a Sex. - 8h às 12h e 13h às 17h48</p>
          <p><i className="fas fa-building"></i> 36.573.767/0001-57</p>
        </div>

        <div className="footer-section">
          <h3>Redes Sociais</h3>
          <a href="https://www.instagram.com/citymais.sorocaba/" target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/citysorocaba#" target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com/company/city-transporte-urbano/?originalSubdomain=br" target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Copyright © 2025{' '}
          <a href="https://votorantim.citymais.com.br/" target="_blank" rel="noreferrer">
            City Votorantim
          </a>{' '}
          – Todos Direitos Reservados.
        </p>
        <a href='/'><FaLock /></a>
      </div>
    </footer>
  );
};

export default Footer;
