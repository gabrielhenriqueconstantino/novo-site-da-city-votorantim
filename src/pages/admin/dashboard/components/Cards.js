import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import horariosData from "../../../user/data/horarios.json";
import "../styles/Cards.css";

const PEXELS_API_KEY = "8Q6JEcA0dmkqOutlr97KXsOHTovvjXqMvE88G033HYdxlJBPzt8ttEsW";
const SEARCH_QUERY = "modern city bus exterior";

// Gere as linhas fora do componente para garantir consistência
const linhas = Object.entries(horariosData.linhas).map(([id, data]) => ({
  id,
  nome: data.nome
}));

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
        const imgs = {};

        linhas.forEach((linha) => {
          const randomIndex = Math.floor(Math.random() * photos.length);
          imgs[linha.id] = photos[randomIndex]?.src?.medium;
        });

        setBackgrounds(imgs);
      } catch (err) {
        console.error("Erro ao buscar imagens do Pexels:", err);
      }
    };

    fetchImages();
  }, []); // 👈 Dependência vazia: executa só uma vez!

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
              borderRadius: "8px",
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
