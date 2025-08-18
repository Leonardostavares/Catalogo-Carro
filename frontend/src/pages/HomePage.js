import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarContext } from '../contexts/CarContext';
import { useCarManagement } from '../hooks/useCarManagement';
import { useSearch } from '../hooks/useSearch';
import { processarCarrosParaMarcas } from '../utils/carUtils';
import { deletarCarro } from '../services/api';
import useNotification from '../hooks/useNotification';

// Componentes
import BrandList from '../components/BrandList/BrandList';
import CarForm from '../components/CarForm/CarForm';
import SearchBar from '../components/SearchBar/SearchBar';
import CarCard from '../components/CarCard/CarCard';
import EditCarModal from '../components/EditCarModal/EditCarModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal/DeleteConfirmModal';
import Notification from '../components/Notification/Notification';

const HomePage = () => {
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const { allCars, isLoading, carregarCarros, removerCarroDoContexto } = useCarContext();
  const { notification, showSuccess, showError, hideNotification } = useNotification();
  
  // Hooks personalizados
  const {
    modalEditOpen,
    carroEmEdicao,
    modalDeleteOpen,
    carroParaExcluir,
    lidarComCriacaoCarro,
    lidarComEdicaoCarro,
    lidarComSalvarEdicao,
    lidarComExclusaoCarro,
    lidarComConfirmarExclusao,
    fecharModalEdicao,
    fecharModalExclusao
  } = useCarManagement();

  const {
    searchResults,
    isSearching,
    handleSearch,
    handleClearSearch
  } = useSearch();

  // Função para selecionar uma marca
  const handleBrandSelect = (brand) => {
    navigate(`/brand/${brand.id}`);
  };

  // Função para limpar carros salvos (para testes)
  const limparCarrosSalvos = async () => {
    try {
      // Filtrar apenas carros do backend
      const carrosBackend = allCars.filter(carro => carro.origem === 'backend');
      
      if (carrosBackend.length === 0) {
        showSuccess('Não há carros do backend para limpar');
        return;
      }

      // Excluir cada carro do backend
      for (const carro of carrosBackend) {
        try {
          await deletarCarro(carro.id);
          // Remover o carro do contexto global
          removerCarroDoContexto(carro.id);
        } catch (error) {
          console.error(`Erro ao excluir carro ${carro.nome_modelo}:`, error);
        }
      }
      
      showSuccess(`${carrosBackend.length} carros do backend foram removidos com sucesso!`);
    } catch (error) {
      console.error('Erro ao limpar carros:', error);
      showError('Erro ao limpar carros do backend');
    }
  };

  const lidarComCriacaoCarroCompleta = async (dadosCarro) => {
    const sucesso = await lidarComCriacaoCarro(dadosCarro);
    if (sucesso) {
      setMostrarFormulario(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>🚗 Catálogo de Carros</h1>
          <div className="header-buttons">
            <button 
              onClick={() => setMostrarFormulario(true)}
              className="add-car-btn"
            >
              ➕ Adicionar Carro
            </button>
            <button 
              onClick={limparCarrosSalvos}
              className="clear-cars-btn"
              title="Limpar carros salvos"
            >
              🗑️ Limpar Salvos
            </button>
          </div>
        </div>
      </header>

      <main className="App-main">
        <div className="container">
          {mostrarFormulario ? (
            <CarForm 
              onSubmit={lidarComCriacaoCarroCompleta}
              onCancel={() => setMostrarFormulario(false)}
            />
          ) : (
            <>
              {isLoading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Carregando marcas...</p>
                </div>
              ) : (
                <>
                  <SearchBar 
                    onSearch={handleSearch}
                    brands={processarCarrosParaMarcas(allCars).map(brand => brand.name)}
                  />
                  
                  {searchResults.length > 0 ? (
                    <div className="search-results">
                      <div className="search-results-header">
                        <div className="search-results-info">
                          <h3>🔍 Resultados da busca</h3>
                          <span className="search-count">
                            {searchResults.length} carro{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <button onClick={handleClearSearch} className="back-btn">
                          <span>⬅️</span>
                          <span>Voltar</span>
                        </button>
                      </div>
                      <div className="cars-grid">
                        {searchResults.map((car, index) => (
                          <CarCard 
                            key={`${car.id}-${index}`}
                            car={car}
                            onEdit={lidarComEdicaoCarro}
                            onDelete={lidarComExclusaoCarro}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <BrandList 
                      brands={processarCarrosParaMarcas(allCars)}
                      onBrandSelect={handleBrandSelect}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
      
      {/* Componente de Notificação */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        duration={notification.duration}
      />

      {/* Modal de Edição */}
      <EditCarModal
        car={carroEmEdicao}
        isOpen={modalEditOpen}
        onClose={fecharModalEdicao}
        onSave={lidarComSalvarEdicao}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        car={carroParaExcluir}
        isOpen={modalDeleteOpen}
        onClose={fecharModalExclusao}
        onConfirm={lidarComConfirmarExclusao}
      />
    </div>
  );
};

export default HomePage;
