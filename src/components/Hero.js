import React from 'react';
import '../styles/Hero.css';

const linhas = [
  { id: '3101', nome: 'Capoavinha' },
  { id: '3102', nome: 'Itapeva Direto' },
  { id: '3103', nome: 'São Lucas' },
  { id: '3104', nome: 'Serrano via Vossoroca' },
  { id: '3105', nome: 'Serrano via Galli' },
  { id: '3106', nome: 'Shopping via JD Paraiso' },
  { id: '3107', nome: 'Shopping via JD Clarice' },
  { id: '3108', nome: 'Novo Mundo via PQ. Bela Vista / Shopping' },
  { id: '3110', nome: 'Green Valley via Shopping' },
  { id: '3111', nome: 'Vila Nova via Vila Irineu' },
  { id: '3112', nome: 'Vila Garcia Direto' },
  { id: '3113', nome: 'Karafá' },
  { id: '3115', nome: 'Fornazari via Cemitério' },
  { id: '3116', nome: 'Itapeva via Jataí' },
  { id: '3118', nome: 'PQ São João via Votocel' },
  { id: '3122', nome: 'Ângelo Vial via JD. Archilla' },
  { id: '3123', nome: 'ETEC Votocel' },
  { id: '3125', nome: 'Alphaville' },
  { id: '3126', nome: 'Bairro dos Morros' },
  { id: '3128', nome: 'Vila Nova / Iguatemi via Vila Garcia' },
];

const Horarios = () => {
  return (
    <section id="horarios" className="horarios">
      <h2>Horários das Linhas</h2>

      <div className="search-container">
        <input
          type="text"
          id="search"
          className="search-bar"
          placeholder="Pesquisar por número ou nome..."
        />
        <button className="search-button">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/search.png"
            alt="Ícone de lupa"
          />
        </button>
      </div>

      <div className="linha-container">
        {linhas.map((linha) => (
          <a
            key={linha.id}
            href={`${linha.id}.html`}
            className="linha"
          >
            Horário {linha.id} - {linha.nome}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Horarios;

