import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaClock, FaArrowsAltH, FaMapMarkerAlt, FaCalendarAlt, FaHome, FaFilePdf, FaBus, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import horariosData from '../data/horarios.json';
import './LinhaDetalhes.css';



const LinhaDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [linha, setLinha] = useState(null);
  const [diaSelecionado, setDiaSelecionado] = useState('dias_uteis');
  const [partidaSelecionada, setPartidaSelecionada] = useState(null);
  const [pontosPartida, setPontosPartida] = useState([]);
  const [dataHoraAtual, setDataHoraAtual] = useState(new Date());
  const [termoBusca, setTermoBusca] = useState('');
  const [hoveredLinha, setHoveredLinha] = useState(null);

  useEffect(() => {
    // Determinar o dia da semana atual (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
    const diaSemana = new Date().getDay();
    
    // Definir o dia selecionado com base no dia atual
    if (diaSemana >= 1 && diaSemana <= 5) { // Segunda a sexta
      setDiaSelecionado('dias_uteis');
    } else if (diaSemana === 6) { // Sábado
      setDiaSelecionado('sabados');
    } else { // Domingo (0) ou outros (por segurança)
      setDiaSelecionado('domingos_feriados');
    }

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

  // Obter todas as linhas para a busca
  const todasLinhas = Object.entries(horariosData.linhas).map(([id, data]) => ({
    id,
    nome: data.nome
  }));

  // Filtrar linhas baseado no termo de busca
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

  const handleLinhaClick = (linhaId) => {
  setLoading(true);
  setTermoBusca(''); // limpa o campo de busca

  setTimeout(() => {
    navigate(`/${linhaId}`);
  }, 600);
};

  const [mostrarTabela, setMostrarTabela] = useState(false);

  const scrollTo = (id) => {
  const element = document.getElementById(id);
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

const toggleNavegacao = () => {
  if (mostrarTabela) {
    scrollTo('horarios');
  } else {
    scrollTo('horarios-tabela');
  }
  setMostrarTabela(!mostrarTabela);
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
          <input
            type="text"
            id="search"
            className="search-bar"
            placeholder="Pesquisar por número ou nome..."
            value={termoBusca}
            onChange={handleBuscaChange}
          />
          <button className="search-button">
            <img src="https://img.icons8.com/ios-filled/50/000000/search.png" alt="Ícone de lupa" />
          </button>
        </div>

        {/* Mostrar resultados da busca apenas quando há termo de busca */}
        {termoBusca && (
          <div className="linha-container">
            {linhasFiltradas.length > 0 ? (
              linhasFiltradas.map((linha) => (
                <button
                  key={linha.id}
                  className={`linha-clickable ${hoveredLinha && hoveredLinha !== linha.id ? 'darker' : ''}`}
                  onClick={() => handleLinhaClick(linha.id)}
                  onMouseEnter={() => setHoveredLinha(linha.id)}
                  onMouseLeave={() => setHoveredLinha(null)}
                >
                Horário {linha.id} - {linha.nome}
                </button>
                ))
              ) : (
              <div className="nenhum-resultado">
                <p>Nenhuma linha encontrada para "{termoBusca}"</p>
              </div>
            )}
          </div>
        )}

        {/* Mostrar a linha atual e botões especiais quando não há busca */}
        {!termoBusca && (
          <div className="linha-container">
            <button className="linha-selected">Horário {id} - {linha.nome}</button>
              <div className='special-buttons'>
                <a href="/" className="linha-button" title="Página Inicial"><FaHome /></a>
                <a 
                  href={linha?.link_pdf || "#"} 
                  className="linha-button" 
                  title="Baixar em PDF"
                  download
                >
                <FaFilePdf />
                </a>
                <a href="/" className="linha-button" title="Itinerário"><FaBus /></a>
                </div>
              </div>
          )}
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
              <h3 id='header-horarios'>{getDiaHorario()} - {partidaSelecionada}</h3>
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
                    <th>Partindo do</th>
                    <th>Horário</th>
                  </tr>
                </thead>
                  <tbody>
                    {horarios.map((horario, index) => (
                  <tr key={index}>
                    <td>{partidaSelecionada}</td>
                    <td>{horario}</td>
                  </tr>
                  ))}
                  </tbody>
               </table>
          </div>
          )}
        </div>

      </section>

      <button 
          className="botao-navegacao-flutuante"
          onClick={toggleNavegacao}
          title={mostrarTabela ? "Voltar para os filtros" : "Ir para a tabela"}
        >
        {mostrarTabela ? (
        <FaArrowUp /> // Ícone para subir
        ) : (
        <FaArrowDown /> // Ícone para descer
      )}
      </button>
    </div>
  );
};

export default LinhaDetalhes;
