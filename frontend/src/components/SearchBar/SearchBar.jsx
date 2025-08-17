import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, brands }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('🔍 Botão de busca clicado!');
    console.log('Marca selecionada:', selectedBrand);
    console.log('Modelo digitado:', searchTerm);
    
    onSearch({
      brand: selectedBrand,
      model: searchTerm.trim()
    });
  };

  const handleClear = () => {
    setSelectedBrand('');
    setSearchTerm('');
    onSearch({ brand: '', model: '' });
  };

  return (
    <div className="search-bar">
      <div className="search-inputs">
        <div className="search-input-group">
          <label htmlFor="brand-select">Marca</label>
          <select
            id="brand-select"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="brand-select"
          >
            <option value="">Todas as marcas</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        
        <div className="search-input-group">
          <label htmlFor="model-input">Modelo</label>
          <input
            id="model-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome do carro..."
            className="model-input"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>
      
      <div className="search-buttons">
        <button onClick={handleSearch} className="search-btn">
          🔍 Buscar
        </button>
        <button onClick={handleClear} className="clear-btn">
          ❌ Limpar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
