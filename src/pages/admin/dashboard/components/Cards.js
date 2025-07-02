import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import SearchBar from "../components/SearchBar";
import HorarioEditor from "../components/HorarioEditor";
import "../styles/Cards.css";

const PEXELS_API_KEY = "8Q6JEcA0dmkqOutlr97KXsOHTovvjXqMvE88G033HYdxlJBPzt8ttEsW";
const SEARCH_QUERY = "modern urban city bus exterior";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Cards = () => {
  const [linhas, setLinhas] = useState([]);
  const [dadosHorarios, setDadosHorarios] = useState(null);
  const [backgrounds, setBackgrounds] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLinhas, setFilteredLinhas] = useState([]);
  const [editingLinha, setEditingLinha] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    const fetchLinhas = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/horarios');
        const data = await res.json();

        const linhasFormatadas = Object.entries(data.linhas).map(([id, info]) => ({
          id,
          nome: info.nome
        }));

        setLinhas(linhasFormatadas);
        setFilteredLinhas(linhasFormatadas);
        setDadosHorarios(data);
      } catch (error) {
        console.error("Erro ao carregar as linhas:", error);
      }
    };

    fetchLinhas();
  }, []);

  useEffect(() => {
    const results = linhas.filter((linha) =>
      linha.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      linha.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLinhas(results);
  }, [searchTerm, linhas]);

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
          const photo = shuffledPhotos[index % shuffledPhotos.length];
          imgs[linha.id] = photo?.src?.medium;
        });

        setBackgrounds(imgs);
      } catch (err) {
        console.error("Erro ao buscar imagens do Pexels:", err);
      }
    };

    fetchImages();
  }, [linhas]);

  const handleSortAsc = () => {
    setFilteredLinhas(prev =>
      [...prev].sort((a, b) => a.id.localeCompare(b.id, "pt-BR", { numeric: true }))
    );
  };

  const handleSortDesc = () => {
    setFilteredLinhas(prev =>
      [...prev].sort((a, b) => b.id.localeCompare(a.id, "pt-BR", { numeric: true }))
    );
  };

  const handleShuffle = () => {
    setFilteredLinhas(prev => shuffleArray(prev));
  };

  const handleEditClick = (linhaId) => {
    setEditingLinha(linhaId);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingLinha(null);
  };

  return (
    <div className="cards-page">
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Pesquisar linhas..."
        onSortAsc={handleSortAsc}
        onSortDesc={handleSortDesc}
        onShuffle={handleShuffle}
      />

      {showEditor && editingLinha && dadosHorarios && (
        <HorarioEditor
          linhaId={editingLinha}
          dadosHorarios={dadosHorarios}
          onClose={handleCloseEditor}
        />
      )}

      <div className="cards-container">
        {filteredLinhas.map((linha) => (
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
              <button 
                className="btn-icon" 
                title="Editar" 
                onClick={() => handleEditClick(linha.id)}
              >
                <Pencil size={19} />
              </button>

              <button className="btn-icon" title="Excluir">
                <Trash2 size={19} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
