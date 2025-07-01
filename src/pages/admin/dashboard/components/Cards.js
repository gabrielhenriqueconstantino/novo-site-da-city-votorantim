import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import horariosData from "../../../user/data/horarios.json";
import "../styles/Cards.css";

const PEXELS_API_KEY = "8Q6JEcA0dmkqOutlr97KXsOHTovvjXqMvE88G033HYdxlJBPzt8ttEsW";
const SEARCH_QUERY = "modern city bus exterior";

const linhas = Object.entries(horariosData.linhas).map(([id, data]) => ({
  id,
  nome: data.nome
}));

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Cards = () => {
  const [backgrounds, setBackgrounds] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `https://api.pexels.com/v1/search?query=${SEARCH_QUERY}&per_page=50`,
          {
            headers: {
              Authorization: PEXELS_API_KEY
            }
          }
        );

        const photos = res.data.photos;
        const shuffledPhotos = shuffleArray(photos);
        const imgs = {};

        linhas.forEach((linha, index) => {
          // Garante que não exceda o número de imagens disponíveis
          const photo = shuffledPhotos[index % shuffledPhotos.length];
          imgs[linha.id] = photo?.src?.medium;
        });

        setBackgrounds(imgs);
      } catch (err) {
        console.error("Erro ao buscar imagens do Pexels:", err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="cards-container">
      {linhas.map((linha) => (
        <div key={linha.id} className="card">
          <div className="card-header">
            <div className="linha-id">{linha.id}</div>
            <div className="linha-nome">{linha.nome}</div>
          </div>

          <div
            className="card-body"
            style={{
              backgroundImage: `url(${backgrounds[linha.id]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100px"
            }}
          />

          <div className="card-footer">
            <button className="btn-icon" title="Editar">
              <Pencil size={19} />
            </button>
            <button className="btn-icon" title="Excluir">
              <Trash2 size={19} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
