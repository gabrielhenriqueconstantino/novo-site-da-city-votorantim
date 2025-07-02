// components/SearchBar/SearchBar.jsx
import React, { useEffect, useRef } from "react";
import { Search, ArrowDownAZ, ArrowUpAZ, Shuffle, Plus } from "lucide-react";
import "../styles/SearchBar.css";

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Pesquisar...",
  onSortAsc,
  onSortDesc,
  onShuffle
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Animação quando o componente é montado
    const container = containerRef.current;
    if (container) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(20px)';
      
      // Timeout para garantir que o CSS seja aplicado antes da animação
      setTimeout(() => {
        container.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 50);
    }

    // Cleanup function
    return () => {
      if (container) {
        container.style.transition = 'none';
      }
    };
  }, []);

  return (
    <div className="busca-container" ref={containerRef}>
      <div className="busca-bar">
        <Search size={20} className="busca-icon" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="busca-input"
        />
        
        <div className="sort-icons">
          <button className="sort-button" title="Nova linha">
            <Plus size={22} />
          </button>
          <button onClick={onSortDesc} className="sort-button" title="Maior para menor">
            <ArrowDownAZ size={22} />
          </button>
          <button onClick={onSortAsc} className="sort-button" title="Menor para maior">
            <ArrowUpAZ size={22} />
          </button>
          <button onClick={onShuffle} className="sort-button" title="Ordem aleatória">
            <Shuffle size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;