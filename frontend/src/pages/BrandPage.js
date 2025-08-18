import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCarContext } from '../contexts/CarContext';
import { useCarManagement } from '../hooks/useCarManagement';
import { processarCarrosParaMarcas } from '../utils/carUtils';
import useNotification from '../hooks/useNotification';

// Componentes
import BrandCars from '../components/BrandCars/BrandCars';
import EditCarModal from '../components/EditCarModal/EditCarModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal/DeleteConfirmModal';
import Notification from '../components/Notification/Notification';

const BrandPage = () => {
  const navigate = useNavigate();
  const { brandId } = useParams();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const { allCars, isLoading } = useCarContext();
  const { notification, hideNotification } = useNotification();
  
  // Hooks personalizados
  const {
    modalEditOpen,
    carroEmEdicao,
    modalDeleteOpen,
    carroParaExcluir,
    lidarComEdicaoCarro,
    lidarComSalvarEdicao,
    lidarComExclusaoCarro,
    lidarComConfirmarExclusao,
    fecharModalEdicao,
    fecharModalExclusao
  } = useCarManagement();

  // Atualizar marca selecionada quando allCars mudar
  useEffect(() => {
    if (allCars.length > 0) {
      // Encontrar a marca selecionada
      const marcas = processarCarrosParaMarcas(allCars);
      const marca = marcas.find(m => m.id.toString() === brandId || m.id === brandId);
      setSelectedBrand(marca);
    }
  }, [allCars, brandId]);

  const handleBackToBrands = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="App">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando carros da marca...</p>
        </div>
      </div>
    );
  }

  if (!selectedBrand) {
    return (
      <div className="App">
        <div className="brand-not-found-container">
          <div className="brand-not-found-content">
            <div className="brand-not-found-icon">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="url(#gradient)"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="brand-not-found-title">🚗 Marca Não Encontrada</h1>
            <p className="brand-not-found-description">
              A marca que você está procurando não foi encontrada em nosso catálogo.
            </p>
            <div className="brand-not-found-suggestions">
              <h3>💡 Sugestões:</h3>
              <ul>
                <li>Verifique se o nome da marca está correto</li>
                <li>Explore outras marcas disponíveis</li>
                <li>Adicione novos carros ao catálogo</li>
              </ul>
            </div>
            <button className="brand-not-found-button" onClick={handleBackToBrands}>
              <span className="button-icon">🏠</span>
              <span className="button-text">Voltar ao Catálogo</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <BrandCars 
        brand={selectedBrand}
        cars={selectedBrand?.cars || []}
        onBack={handleBackToBrands}
        onEdit={lidarComEdicaoCarro}
        onDelete={lidarComExclusaoCarro}
      />
      
      {/* Modais */}
      {modalEditOpen && carroEmEdicao && (
        <EditCarModal
          isOpen={modalEditOpen}
          car={carroEmEdicao}
          onSave={lidarComSalvarEdicao}
          onClose={fecharModalEdicao}
        />
      )}

      {modalDeleteOpen && carroParaExcluir && (
        <DeleteConfirmModal
          isOpen={modalDeleteOpen}
          car={carroParaExcluir}
          onConfirm={lidarComConfirmarExclusao}
          onClose={fecharModalExclusao}
        />
      )}
      
      {/* Notificação */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </div>
  );
};

export default BrandPage;
