/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';
import '../styles/global.css';
import horariosData from '../../data/horarios.json';
import ItinerarioDetalhes from '../../linhas/itinerarios/ItinerarioDetalhes';
import { FaSearch } from 'react-icons/fa';

const Hero = ({ showItinerarios }) => {
  const [termoBusca, setTermoBusca] = useState('');
  const [hoveredLinha, setHoveredLinha] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);
  
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
    <section id="itinerarios" className="horarios">
      <h2>Itinerários das Linhas</h2>

      <div className="search-container">
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

      <div className="linha-container">
        {linhasFiltradas.length > 0 ? (
          linhasFiltradas.map((linha) => (
                  <Link
                  key={linha.id}
                  to={`/itinerarios/${linha.id}`}
                  className={`linha ${hoveredLinha && hoveredLinha !== linha.id ? 'darker' : ''}`}
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
    <section id="horarios" className="horarios">
      <h2>Horários das Linhas</h2>

       <div className="search-container">
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

      <div className="linha-container">
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