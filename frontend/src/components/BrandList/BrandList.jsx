import React from 'react';
import './BrandList.css';

const BrandList = ({ brands, onBrandSelect }) => {
  return (
    <div className="brand-list-container">
              <div className="brand-list-header">
          <h1 className="brand-list-title">Catálogo de Carros</h1>
          <p className="brand-list-subtitle">Selecione uma marca para ver os carros disponíveis</p>
        </div>

      <div className="brands-grid">
        {brands.map((brand) => (
          <div 
            key={brand.name} 
            className="brand-card"
            onClick={() => onBrandSelect(brand)}
          >
                          <div className="brand-card-content">
                <div className="brand-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="currentColor"/>
                  </svg>
                </div>
                <h2 className="brand-name">{brand.name}</h2>
              <div className="brand-stats">
                <div className="brand-stat">
                  <span className="stat-number">{brand.carCount}</span>
                  <span className="stat-label">Carros</span>
                </div>
              </div>
              <div className="brand-description">
                Clique para ver todos os carros da marca {brand.name}
              </div>
            </div>
            <div className="brand-card-hover">
              <span>Ver Carros →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandList;
