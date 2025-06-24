/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Hero.css';
import '../styles/global.css';
import horariosData from '../../data/horarios.json';
import ItinerarioDetalhes from '../../linhas/itinerarios/ItinerarioDetalhes'
import { FaSearch } from 'react-icons/fa';

const Hero = ({ showItinerarios }) => {
  const [termoBusca, setTermoBusca] = useState('');
  const [hoveredLinha, setHoveredLinha] = useState(null);
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);

  // Estados para animação sequencial
  const [showTitle, setShowTitle] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLinhas, setShowLinhas] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const location = useLocation();

  // Efeito para animação quando a rota muda
  useEffect(() => {
    setIsTransitioning(true);
    setShowTitle(false);
    setShowSearch(false);
    setShowLinhas(false);
    
    const t0 = setTimeout(() => setIsTransitioning(false), 100);
    const t1 = setTimeout(() => setShowTitle(true), 300);
    const t2 = setTimeout(() => setShowSearch(true), 500);
    const t3 = setTimeout(() => setShowLinhas(true), 700);
    
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname]);

  const todasLinhas = Object.entries(horariosData.linhas).map(([id, data]) => ({
    id,
    nome: data.nome
  }));

  const linhasFiltradas = todasLinhas.filter(linha => {
    const busca = termoBusca.toLowerCase();
    return (
      linha.id.toLowerCase().includes(busca) || 
      linha.nome.toLowerCase().includes(busca)
    );
  });

  const handleBuscaChange = (e) => {
    setTermoBusca(e.target.value);
  };

  if (showItinerarios) {
    return (
      <section id="itinerarios" className={`horarios ${isTransitioning ? 'transitioning' : ''}`}>
        <h2 className={`fade-in-up fade-delay-1${showTitle ? ' visible' : ''}`}>Itinerários das Linhas</h2>

        <div className={`search-container fade-in-up fade-delay-2${showSearch ? ' visible' : ''}`}>
          <FaSearch className='lupa'/>
          <input
            type="text"
            id="search"
            className="search-bar"
            placeholder="Pesquisar por número ou nome..."
            value={termoBusca}
            onChange={handleBuscaChange}
          />
        </div>

        <div className={`linha-container fade-in-up fade-delay-3${showLinhas ? ' visible' : ''}`}>
          {linhasFiltradas.length > 0 ? (
            linhasFiltradas.map((linha, idx) => (
              <Link
                key={linha.id}
                to={`/itinerarios/${linha.id}`}
                className={`linha`}
                onMouseEnter={() => setHoveredLinha(linha.id)}
                onMouseLeave={() => setHoveredLinha(null)}
              >
                Itinerário {linha.id} - {linha.nome}
              </Link>
            ))
          ) : (
            <div className="nenhum-resultado">
              <p>Nenhuma linha encontrada para "{termoBusca}"</p>
              <img src="./img/ponto_onibus.jpg" alt="Ponto de ônibus" />
              <a
                href="https://br.freepik.com/vetores-gratis/pessoas-esperando-o-transporte-publico-no-ponto-de-onibus-banco-leitura-ilustracao-em-vetor-plana-paisagem-urbana-transporte-e-conceito-de-estilo-de-vida-urbano_10613348.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Imagem de pch.vector no Freepik
              </a>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Renderização padrão (horários)
  return (
    <section id="horarios" className={`horarios ${isTransitioning ? 'transitioning' : ''}`}>
      <h2 className={`fade-in-up fade-delay-1${showTitle ? ' visible' : ''}`}>Horários das Linhas</h2>

      <div className={`search-container fade-in-up fade-delay-2${showSearch ? ' visible' : ''}`}>
        <FaSearch className='lupa'/>
        <input
          type="text"
          id="search"
          className="search-bar"
          placeholder="Pesquisar por número ou nome..."
          value={termoBusca}
          onChange={handleBuscaChange}
        />
      </div>

      <div className={`linha-container fade-in-up fade-delay-3${showLinhas ? ' visible' : ''}`}>
        {linhasFiltradas.length > 0 ? (
          linhasFiltradas.map((linha) => (
            <Link
              key={linha.id}
              to={`/horarios/${linha.id}`}
              className={`linha ${hoveredLinha && hoveredLinha !== linha.id ? 'darker' : ''}`}
              onMouseEnter={() => setHoveredLinha(linha.id)}
              onMouseLeave={() => setHoveredLinha(null)}
            >
              Horário {linha.id} - {linha.nome}
            </Link>
          ))
        ) : (
          <div className="nenhum-resultado">
            <p>Nenhuma linha encontrada para "{termoBusca}"</p>
            <img src="./img/ponto_onibus.jpg" alt="Ponto de ônibus" />
            <a
              href="https://br.freepik.com/vetores-gratis/pessoas-esperando-o-transporte-publico-no-ponto-de-onibus-banco-leitura-ilustracao-em-vetor-plana-paisagem-urbana-transporte-e-conceito-de-estilo-de-vida-urbano_10613348.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Imagem de pch.vector no Freepik
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;