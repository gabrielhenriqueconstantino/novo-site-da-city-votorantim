import React, { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { FaHome, FaFilePdf, FaBus, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import "./ItinerarioDetalhes.css";
import "../horarios/LinhaDetalhes.css"
import itinerarios from "../../data/itinerarios.json";
import horariosData from "../../data/horarios.json";

const Itinerarios = () => {
  const { linhaId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [termoBusca, setTermoBusca] = useState('');
  const [hoveredLinha, setHoveredLinha] = useState(null);
  const [mostrarTabela, setMostrarTabela] = useState(false);

  const direcao = searchParams.get("direcao") || "BAIRRO";

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
    setTermoBusca(''); // limpa o campo de busca
    navigate(`/itinerarios/${linhaId}`);
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

  if (!linha) {
    return <div>Linha não encontrada</div>;
  }

  const handleDirecaoClick = (novaDirecao) => {
    navigate(`/itinerarios/${linhaId}?direcao=${novaDirecao}`);
  };

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
    <div>
      <section id="itinerario" className="itinerario">
        <h2>Itinerários das Linhas</h2>

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

        {/* Mostrar a linha atual e botões especiais quando não há busca */}
        {!termoBusca && (
          <div className="linha-container">
            <button className="linha-selected">Itinerário {linhaId} - {linha.nome}</button>
            <div className='special-buttons'>
              <a href="/" className="linha-button" title="Página Inicial"><FaHome /></a>
              <a 
                href={linhaHorario?.link_pdf || "#"} 
                className="linha-button" 
                title="Baixar em PDF"
                download
              >
                <FaFilePdf />
              </a>
              <a href={`/${linhaId}`} className="linha-button" title="Horários"><FaBus /></a>
            </div>
          </div>
        )}
      </section>

      <section id="itinerario-tabela" className="itinerario-tabela">
        <div className="direcao-container">
          {Object.keys(linha.partindo_de).map((direcaoKey) => {
        let label = "";

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
        case "SHOPPING_RETORNO": // se você tiver outros casos personalizados no futuro
          label = "Shopping → Bairro";
          break;
        default:
          label = direcaoKey;
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

        <div className="paradas-list">
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
        {mostrarTabela ? (
          <FaArrowUp /> // Ícone para subir
        ) : (
          <FaArrowDown /> // Ícone para descer
        )}
      </button>
    </div>
  );
};

export default Itinerarios;