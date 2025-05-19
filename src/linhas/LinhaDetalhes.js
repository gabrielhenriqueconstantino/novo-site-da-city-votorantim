import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaArrowsAltH, FaMapMarkerAlt, FaCalendarAlt, FaHome } from 'react-icons/fa';
import horariosData from '../data/horarios.json';
import './LinhaDetalhes.css';

const LinhaDetalhes = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [linha, setLinha] = useState(null);
  const [diaSelecionado, setDiaSelecionado] = useState('dias_uteis');
  const [partidaSelecionada, setPartidaSelecionada] = useState(null);
  const [pontosPartida, setPontosPartida] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const linhaSelecionada = horariosData.linhas[id];
      if (linhaSelecionada) {
        setLinha(linhaSelecionada);
        // Determinar os pontos de partida disponíveis
        const pontos = Object.keys(linhaSelecionada.dias_uteis);
        setPontosPartida(pontos);
        setPartidaSelecionada(pontos[0]); // Definir o primeiro como padrão
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleDiaClick = (dia) => {
    setDiaSelecionado(dia);
  };

  const handlePartidaClick = (partida) => {
    setPartidaSelecionada(partida);
  };

  const getDiaHorario = () => {
    switch(diaSelecionado) {
      case 'dias_uteis': return 'Dias Úteis';
      case 'sabados': return 'Sábados';
      default: return 'Domingos e Feriados';
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!linha) {
    return <div className="error">Linha não encontrada</div>;
  }

  // Verificar se há horários para o dia e partida selecionados
  const horarios = linha[diaSelecionado] && linha[diaSelecionado][partidaSelecionada];
  const semCirculacao = typeof horarios === 'string' && horarios.includes('NÃO HÁ CIRCULAÇÃO');

  return (
    <div>
      <section id="horarios" className="horarios">
        <h2>Horários das Linhas</h2>

        <div className="search-container">
          <input type="text" id="search" className="search-bar" placeholder="Pesquisar por número ou nome..." />
          <button className="search-button">
            <img src="https://img.icons8.com/ios-filled/50/000000/search.png" alt="Ícone de lupa" />
          </button>
        </div>

        <div className="linha-container">
          <a href="/" className="linha home-button" title="Página Inicial">
            <FaHome />
          </a>
          <a href={`/${id}`} className="linha">Horário {id} - {linha.nome}</a>
        </div>
      </section>

      <section id="selecionar-horario" className="selecionar-horario">
        <div className="dia-container">
          <button 
            className={`btn-dia ${diaSelecionado === 'dias_uteis' ? 'active' : ''}`}
            onClick={() => handleDiaClick('dias_uteis')}
          >
            Dias Úteis
          </button>
          <button 
            className={`btn-dia ${diaSelecionado === 'sabados' ? 'active' : ''}`}
            onClick={() => handleDiaClick('sabados')}
          >
            Sábados
          </button>
          <button 
            className={`btn-dia ${diaSelecionado === 'domingos_feriados' ? 'active' : ''}`}
            onClick={() => handleDiaClick('domingos_feriados')}
          >
            Domingos e feriados
          </button>
        </div>

        <div className="partida-container">
          {pontosPartida.map((ponto) => (
            <button
              key={ponto}
              className={`btn-partida ${partidaSelecionada === ponto ? 'active' : ''}`}
              onClick={() => handlePartidaClick(ponto)}
            >
              {ponto}
            </button>
          ))}
        </div>

        <div className="info-container">
          <div className="info-box">
            <div className="info-item">
              <FaClock />
              <p id="dia-horario">{getDiaHorario()}</p>
            </div>

            <div className="info-item">
              <FaArrowsAltH />
              <p>Linha Municipal {id} - {linha.nome}</p>
            </div>
            
            <div className="info-item">
              <FaMapMarkerAlt />
              <p id="localizacao">Partida: {partidaSelecionada}</p>
            </div>

            <div className="info-item">
              <FaCalendarAlt />
              <p>Vigência: {linha.vigencia}</p>
            </div>
          </div>
        </div>

        <div id="horarios-tabela" className="horarios-tabela">
          {!horarios ? (
            <div className="tabela">
              <h3>{getDiaHorario()} - {partidaSelecionada}</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Não há horários disponíveis</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : semCirculacao ? (
            <div className="tabela">
              <h3>{getDiaHorario()} - {partidaSelecionada}</h3>
              <table>
                <tbody>
                  <tr>
                    <td>{horarios}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="tabela">
              <h3>{getDiaHorario()} - {partidaSelecionada}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Partindo de</th>
                    <th>Horário</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={horarios.length}>{partidaSelecionada}</td>
                    <td>{horarios[0]}</td>
                  </tr>
                  {horarios.slice(1).map((horario, index) => (
                    <tr key={index}>
                      <td>{horario}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LinhaDetalhes;