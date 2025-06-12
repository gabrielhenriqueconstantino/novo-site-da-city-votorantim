import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { FaHome, FaFilePdf, FaClock, FaArrowDown, FaArrowUp, FaSearch } from 'react-icons/fa';
import "./ItinerarioDetalhes.css";
import "../horarios/LinhaDetalhes.css";
import itinerarios from "../../data/itinerarios.json";
import horariosData from "../../data/horarios.json";


const Itinerarios = () => {
  const { linhaId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [termoBusca, setTermoBusca] = useState('');
  const [hoveredLinha, setHoveredLinha] = useState(null);
  const [mostrarTabela, setMostrarTabela] = useState(false);
  const [animationClass, setAnimationClass] = useState('fade-in');
  const [loading, setLoading] = useState(true);
  const [clickedButton, setClickedButton] = useState(null);

  const direcao = searchParams.get("direcao") || "BAIRRO";

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, [linhaId]);

  const linha = itinerarios.linhas[linhaId];
  const linhaHorario = horariosData.linhas[linhaId];

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

  const handleLinhaClick = (linhaId) => {
    setLoading(true);
    setTermoBusca('');
    setAnimationClass('fade-out');
    setTimeout(() => {
      navigate(`/itinerarios/${linhaId}`);
      setAnimationClass('fade-in');
    }, 600);
  };

  const handleButtonClick = (buttonType) => {
    setClickedButton(buttonType);
    setTermoBusca('');
    
    setTimeout(() => {
      setClickedButton(null);
    }, 300);
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const toggleNavegacao = () => {
    if (mostrarTabela) {
      scrollTo('itinerario');
    } else {
      scrollTo('itinerario-tabela');
    }
    setMostrarTabela(!mostrarTabela);
  };

  const handleDirecaoClick = (novaDirecao) => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      navigate(`/itinerarios/${linhaId}?direcao=${novaDirecao}`);
      setAnimationClass('fade-in');
    }, 100);
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
    return <div>Linha não encontrada</div>;
  }

  const paradas = linha.partindo_de[direcao] || {};
  const paradasArray = Object.entries(paradas)
    .sort(([keyA], [keyB]) => {
      if (keyA === "ponto_inicial") return -1;
      if (keyB === "ponto_inicial") return 1;
      if (keyA === "ponto_final") return 1;
      if (keyB === "ponto_final") return -1;
      const numA = parseInt(keyA.replace('p', ''));
      const numB = parseInt(keyB.replace('p', ''));
      return numA - numB;
    });

  return (
    <div className={`itinerario-container ${animationClass}`}>
      <section id="itinerario" className="horarios">
        <h2>Itinerários das Linhas</h2>

        <div className="search-container" style={{ display: 'flex', alignItems: 'center' }}>
                <FaSearch className='lupa' style={{ marginRight: '-28px', zIndex: '1001' }} />
                <input
                  type="text"
                  id="search"
                  className="search-bar"
                  placeholder="Pesquisar por número ou nome..."
                  value={termoBusca}
                  onChange={handleBuscaChange}
                />
              </div>
        

        {termoBusca && (
          <div className="linha-container">
            {linhasFiltradas.length > 0 ? (
              linhasFiltradas.map((linha) => (
                <button
                  key={linha.id}
                  className={`linha ${hoveredLinha && hoveredLinha !== linha.id ? 'darker' : ''}`}
                  onClick={() => handleLinhaClick(linha.id)}
                  onMouseEnter={() => setHoveredLinha(linha.id)}
                  onMouseLeave={() => setHoveredLinha(null)}
                >
                  Itinerário {linha.id} - {linha.nome}
                </button>
              ))
            ) : (
              <div className="nenhum-resultado">
                <p>Nenhuma linha encontrada para "{termoBusca}"</p>
              </div>
            )}
          </div>
        )}

        {!termoBusca && (
          <div className="linha-container">
            <button className="linha-selected">Itinerário {linhaId} - {linha.nome}</button>
            <div className='special-buttons'>
              <a 
                href="/" 
                className={`linha-button ${clickedButton === 'home' ? 'button-clicked' : ''}`} 
                title="Página Inicial"
                onClick={() => handleButtonClick('home')}
              >
                <FaHome />
              </a>
              <a 
                href={linhaHorario?.link_pdf || "#"} 
                className={`linha-button ${clickedButton === 'pdf' ? 'button-clicked' : ''}`} 
                title="Baixar em PDF"
                download
                onClick={() => handleButtonClick('pdf')}
              >
                <FaFilePdf />
              </a>
              <a 
                href={`/horarios/${linhaId}`} 
                className={`linha-button ${clickedButton === 'horarios' ? 'button-clicked' : ''}`} 
                title="Horários"
                onClick={() => handleButtonClick('horarios')}
              >
                <FaClock />
              </a>
            </div>
          </div>
        )}
      </section>

      <section id="itinerario-tabela" className="itinerario-tabela">
        <div className="direcao-container">
          {Object.keys(linha.partindo_de).map((direcaoKey) => {
            let label = "";
      
            if (linhaId === "3103" || linhaId === "3128") {
              if (direcaoKey === "BAIRRO") {
                label = "Bairro → Shopping";
              } else if (direcaoKey === "SHOPPING") {
                label = "Shopping → Bairro";
              } else {
                label = direcaoKey;
              }
            } else {
              switch (direcaoKey) {
                case "BAIRRO":
                  label = "Bairro → Centro";
                  break;
                case "CENTRO":
                  label = "Centro → Bairro";
                  break;
                case "SHOPPING":
                  label = "Bairro → Shopping";
                  break;
                case "SHOPPING_RETORNO":
                  label = "Shopping → Bairro";
                  break;
                default:
                  label = direcaoKey;
              }
            }

            return (
              <button
                key={direcaoKey}
                onClick={() => handleDirecaoClick(direcaoKey)}
                className={`btn-direcao ${direcao === direcaoKey ? "active" : ""}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className={`paradas-list ${animationClass}`}>
          {paradasArray.map(([key, parada]) => {
            const isPontoInicial = key === "ponto_inicial";
            const isPontoFinal = key === "ponto_final";

            return (
              <div key={key} className="parada-item">
                <div className={`parada-marker ${
                  isPontoInicial ? "inicial" : 
                  isPontoFinal ? "final" : ""
                }`}></div>
                <div className="parada-nome">
                  {parada}
                  {(isPontoInicial || isPontoFinal) && (
                    <span className="ponto-tag">
                      {isPontoInicial ? "Ponto Inicial" : "Ponto Final"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <button 
        className="botao-navegacao-flutuante"
        onClick={toggleNavegacao}
        title={mostrarTabela ? "Voltar para os filtros" : "Ir para a tabela"}
      >
        {mostrarTabela ? <FaArrowUp /> : <FaArrowDown />}
      </button>
    </div>
  );
};

export default Itinerarios;