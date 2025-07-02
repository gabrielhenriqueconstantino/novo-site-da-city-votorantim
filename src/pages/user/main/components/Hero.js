/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Hero.css';
import '../styles/global.css';
import { FaSearch } from 'react-icons/fa';

const Hero = ({ showItinerarios }) => {
  const [termoBusca, setTermoBusca] = useState('');
  const [hoveredLinha, setHoveredLinha] = useState(null);
  const [horariosData, setHorariosData] = useState({});

  const [showTitle, setShowTitle] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLinhas, setShowLinhas] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const location = useLocation();

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

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/horarios');
        const data = await res.json();
        setHorariosData(data);
      } catch (err) {
        console.error("Erro ao carregar os dados do backend:", err);
      }
    };

    fetchHorarios();
  }, []);

  if (!horariosData.linhas) {
    return null; // Não renderiza nada até os dados chegarem
  }

  const todasLinhas = Object.entries(horariosData.linhas).map(([id, data]) => ({
    id,
    nome: data.nome
  }));

  const linhasFiltradas = todasLinhas.filter((linha) => {
    const busca = termoBusca.toLowerCase();
    return linha.id.toLowerCase().includes(busca) || linha.nome.toLowerCase().includes(busca);
  });

  const handleBuscaChange = (e) => setTermoBusca(e.target.value);

  const renderLinhas = (rotaBase) => (
    <div className={`linha-container fade-in-up fade-delay-3${showLinhas ? ' visible' : ''}`}>
      {linhasFiltradas.length > 0 ? (
        linhasFiltradas.map((linha) => (
          <Link
            key={linha.id}
            to={`/${rotaBase}/${linha.id}`}
            className={`linha ${hoveredLinha && hoveredLinha !== linha.id ? 'darker' : ''}`}
            onMouseEnter={() => setHoveredLinha(linha.id)}
            onMouseLeave={() => setHoveredLinha(null)}
          >
            {rotaBase === 'itinerarios' ? 'Itinerário' : 'Horário'} {linha.id} - {linha.nome}
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
  );

  return (
    <section id={showItinerarios ? "itinerarios" : "horarios"} className={`horarios ${isTransitioning ? 'transitioning' : ''}`}>
      <h2 className={`fade-in-up fade-delay-1${showTitle ? ' visible' : ''}`}>
        {showItinerarios ? "Itinerários das Linhas" : "Horários das Linhas"}
      </h2>

      <div className={`search-container fade-in-up fade-delay-2${showSearch ? ' visible' : ''}`}>
        <FaSearch className='lupa'/>
        <input
          type="text"
          className="search-bar"
          placeholder="Pesquisar por número ou nome..."
          value={termoBusca}
          onChange={handleBuscaChange}
        />
      </div>

      {renderLinhas(showItinerarios ? 'itinerarios' : 'horarios')}
    </section>
  );
};

export default Hero;
