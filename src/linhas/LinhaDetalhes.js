import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaArrowsAltH, FaMapMarkerAlt, FaCalendarAlt, FaHome, FaFilePdf, FaBus } from 'react-icons/fa';
import horariosData from '../data/horarios.json';
import './LinhaDetalhes.css';

const LinhaDetalhes = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [linha, setLinha] = useState(null);
  const [diaSelecionado, setDiaSelecionado] = useState('dias_uteis');
  const [partidaSelecionada, setPartidaSelecionada] = useState(null);
  const [pontosPartida, setPontosPartida] = useState([]);
  const [dataHoraAtual, setDataHoraAtual] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setDataHoraAtual(new Date());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const formatarDataHoraAtual = () => {
    const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const diaSemana = diasSemana[dataHoraAtual.getDay()];
    const horas = String(dataHoraAtual.getHours()).padStart(2, '0');
    const minutos = String(dataHoraAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataHoraAtual.getSeconds()).padStart(2, '0');
    return `Hoje é ${diaSemana}, ${horas}:${minutos}:${segundos}`;
  };

  useEffect(() => {
    setTimeout(() => {
      const linhaSelecionada = horariosData.linhas[id];
      if (linhaSelecionada) {
        setLinha(linhaSelecionada);
        const pontos = Object.keys(linhaSelecionada.dias_uteis);
        setPontosPartida(pontos);
        setPartidaSelecionada(pontos[0]);
      }
      setLoading(false);
    }, 600);
  }, [id]);

  const handleDiaClick = (dia) => {
    setDiaSelecionado(dia);
  };

  const handlePartidaClick = (partida) => {
    setPartidaSelecionada(partida);
  };

  const getDiaHorario = () => {
    switch (diaSelecionado) {
      case 'dias_uteis': return 'Dias Úteis';
      case 'sabados': return 'Sábados';
      default: return 'Domingos e Feriados';
    }
  };

  const getLocalPartida = () => {
    if (!linha || !linha.local_partida || !partidaSelecionada) return 'Local não especificado';
    return linha.local_partida[partidaSelecionada] || 'Local não especificado';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!linha) {
    return <div className="error">Linha não encontrada</div>;
  }

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
          <div className='special-buttons'>
            <a href="/" className="linha-button" title="Página Inicial"><FaHome /></a>
            <a href="/" className="linha-button" title="Baixar em PDF"><FaFilePdf /></a>
            <a href="/" className="linha-button" title="Itinerário"><FaBus /></a>
          </div>
          <a className="linha-selected">Horário {id} - {linha.nome}</a>
        </div>
      </section>

      <section id="selecionar-horario" className="selecionar-horario">
        <div className="dia-container">
          <button className={`btn-dia ${diaSelecionado === 'dias_uteis' ? 'active' : ''}`} onClick={() => handleDiaClick('dias_uteis')}>Dias Úteis</button>
          <button className={`btn-dia ${diaSelecionado === 'sabados' ? 'active' : ''}`} onClick={() => handleDiaClick('sabados')}>Sábados</button>
          <button className={`btn-dia ${diaSelecionado === 'domingos_feriados' ? 'active' : ''}`} onClick={() => handleDiaClick('domingos_feriados')}>Domingos e feriados</button>
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
              <i><FaClock /></i>
              <p id="dia-horario">{formatarDataHoraAtual()}</p>
            </div>

            <div className="info-item">
              <i><FaArrowsAltH /></i>
              <p>Linha Municipal {id} - {linha.nome}</p>
            </div>

            <div className="info-item">
              <i><FaMapMarkerAlt /></i>
              <p id="localizacao">Partida: {getLocalPartida()}</p>
            </div>

            <div className="info-item">
              <i><FaCalendarAlt /></i>
              <p>Vigência: {linha.vigencia}</p>
            </div>
          </div>
        </div>

        <div id="horarios-tabela" className="horarios-tabela">
          {!horarios ? (
            <div className="tabela">
              <h3>{getDiaHorario()} - {partidaSelecionada}</h3>
              <table><tbody><tr><td>Não há horários disponíveis</td></tr></tbody></table>
            </div>
          ) : semCirculacao ? (
            <div className="tabela">
              <h3>{getDiaHorario()} - {partidaSelecionada}</h3>
              <table><tbody><tr><td>{horarios}</td></tr></tbody></table>
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
