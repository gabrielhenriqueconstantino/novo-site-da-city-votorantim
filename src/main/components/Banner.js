import React from 'react';
import '../styles/Banner.css';

const Banner = () => {
  return (
    <section className="banner">
      {/* Conteúdo desktop: texto à esquerda, imagem à direita */}
      <div className="banner-content-desktop">
        <div className="banner-texto-desktop">
          <h1>Bem vindo à City+ Votorantim</h1>
          <p>Confira horários, itinerários e <br />detalhes das linhas municipais.</p>
        </div>
        <img
          src="/img/bus-icon.png"
          alt="icone-onibus"
          className="banner-img-desktop"
        />
      </div>
      {/* Imagem visível apenas no mobile */}
      <img
        src="/img/banner-img.png"
        alt="Banner CITY+ com ônibus e mapa"
        className="banner-img-central"
      />
    </section>
  );
};

export default Banner;