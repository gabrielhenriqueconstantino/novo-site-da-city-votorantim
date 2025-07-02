// components/SearchBar/SearchBar.jsx
import React from "react";
import { Search, ArrowDownAZ, ArrowUpAZ, Shuffle } from "lucide-react";
import "../styles/SearchBar.css";

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Pesquisar...",
  onSortAsc,       // função para ordenar ascendente
  onSortDesc,      // função para ordenar descendente
  onShuffle        // função para ordenar aleatoriamente
}) => {
  return (
    <div className="busca-container">
      <div className="busca-bar">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="busca-input"
        />
        
        <div className="sort-icons">
          <button onClick={onSortDesc} className="sort-button" title="Maior para menor">
            <ArrowDownAZ size={18} />
          </button>
          <button onClick={onSortAsc} className="sort-button" title="Menor para maior">
            <ArrowUpAZ size={18} />
          </button>
          <button onClick={onShuffle} className="sort-button" title="Ordem aleatória">
            <Shuffle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;