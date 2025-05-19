import React, { useState } from 'react'; // Adicionei o useState aqui
import { Link } from 'react-router-dom';
import '../styles/Hero.css';
import horariosData from '../../data/horarios.json';

const Linhas = () => {
  const [termoBusca, setTermoBusca] = useState('');
  
  // Converter o objeto de linhas em array e adicionar o ID
  const todasLinhas = Object.entries(horariosData.linhas).map(([id, data]) => ({
    id,
    nome: data.nome
  }));

  // Filtrar as linhas baseado no termo de busca
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

  return (
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
          <img
            src="https://img.icons8.com/ios-filled/50/000000/search.png"
            alt="Ícone de lupa"
          />
        </button>
      </div>

      <div className="linha-container">
        {linhasFiltradas.length > 0 ? (
          linhasFiltradas.map((linha) => (
            <Link
              key={linha.id}
              to={`/${linha.id}`}
              className="linha"
            >
              Horário {linha.id} - {linha.nome}
            </Link>
          ))
        ) : (
          <div className="nenhum-resultado">
            Nenhuma linha encontrada para "{termoBusca}"
          </div>
        )}
      </div>
    </section>
  );
};

export default Linhas;