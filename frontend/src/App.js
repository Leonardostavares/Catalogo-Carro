import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import BrandList from './components/BrandList/BrandList';
import BrandCars from './components/BrandCars/BrandCars';
import CarForm from './components/CarForm/CarForm';
import SearchBar from './components/SearchBar/SearchBar';
import CarCard from './components/CarCard/CarCard';
import EditCarModal from './components/EditCarModal/EditCarModal';
import DeleteConfirmModal from './components/DeleteConfirmModal/DeleteConfirmModal';
import Notification from './components/Notification/Notification';
import useNotification from './hooks/useNotification';
import { obterCarrosDoBackend, criarCarro, atualizarCarro, deletarCarro, verificarSeCarroExiste, limparCache } from './services/api';
import './App.css';

// Contexto global para gerenciar o estado dos carros
const CarContext = createContext();

// Hook personalizado para usar o contexto
const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCarContext deve ser usado dentro de um CarProvider');
  }
  return context;
};

// Provider do contexto
function CarProvider({ children }) {
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função para carregar carros
  const carregarCarros = async () => {
    try {
      setIsLoading(true);
      
      // Limpar qualquer cache existente
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
      
      // Limpar cache da API
      limparCache();
      
      // Timeout para evitar loading infinito
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 10000);
      
      // Buscar carros do backend real
      console.log('Buscando carros do backend...');
      let carrosBackend = [];
      try {
        carrosBackend = await obterCarrosDoBackend();
        console.log('Carros obtidos do backend:', carrosBackend);
      } catch (error) {
        console.error('Erro ao buscar carros do backend:', error);
        carrosBackend = [];
      }
      
      // Dados mockados da API externa
      const dadosCarros = {
        cars: [
          { id: 55, timestamp_cadastro: 1696549488, modelo_id: 88, ano: 2014, combustivel: "FLEX", num_portas: 4, cor: "BRANCA", nome_modelo: "ETIOS", valor: 36.000, brand: 1 },
          { id: 23, timestamp_cadastro: 1696531236, modelo_id: 77, ano: 2014, combustivel: "FLEX", num_portas: 4, cor: "PRETO", nome_modelo: "COROLLA", valor: 120.000, brand: 1 },
          { id: 3, timestamp_cadastro: 16965354321, modelo_id: 79, ano: 1993, combustivel: "DIESEL", num_portas: 4, cor: "AZUL", nome_modelo: "HILLUX SW4", valor: 47.500, brand: 1 }
        ]
      };
      
      const dadosCarrosPorMarca = {
        cars: [
          { id: 1, timestamp_cadastro: 1696539488, modelo_id: 12, ano: 2015, combustivel: "FLEX", num_portas: 4, cor: "BEGE", nome_modelo: "ONIX PLUS", valor: 50, brand: 3 },
          { id: 2, timestamp_cadastro: 1696531234, modelo_id: 14, ano: 2014, combustivel: "FLEX", num_portas: 4, cor: "AZUL", nome_modelo: "JETTA", valor: 49, brand: 2 },
          { id: 3, timestamp_cadastro: 16965354321, modelo_id: 79, ano: 1993, combustivel: "DIESEL", num_portas: 4, cor: "AZUL", nome_modelo: "HILLUX SW4", valor: 47.5, brand: 1 }
        ]
      };
      
      // Processar carros do backend
      const carrosProcessadosBackend = carrosBackend.length > 0 ? carrosBackend.map(carro => ({
        id: carro.id,
        nome_modelo: carro.nomeModelo,
        marca: carro.nomeMarca,
        ano: carro.ano,
        combustivel: carro.combustivel,
        num_portas: carro.numPortas,
        cor: carro.cor,
        valor: carro.valor,
        timestamp_cadastro: carro.timestampCadastro,
        origem: 'backend'
      })) : [];
      
      // Processar carros da API externa
      const carrosExternos = [...dadosCarros.cars, ...dadosCarrosPorMarca.cars].map((carro, index) => ({
        ...carro,
        origem: 'api_externa',
        id: carro.id || `sem_id_${index}_${Date.now()}`
      }));
      
      // Combinar todos os carros
      const todosCarros = [...carrosProcessadosBackend, ...carrosExternos];
      
      clearTimeout(timeoutId);
      setAllCars(todosCarros);
      setIsLoading(false);
      
    } catch (error) {
      console.error('Erro ao carregar carros:', error);
      setIsLoading(false);
    }
  };

  // Função para atualizar um carro
  const atualizarCarroNoContexto = (idCarro, dadosAtualizados) => {
    console.log('Atualizando carro no contexto:', idCarro, dadosAtualizados);
    setAllCars(prevCars => {
      const carrosAtualizados = prevCars.map(carro => {
        if (carro.id === idCarro) {
          console.log('Carro encontrado para atualização:', carro);
          const carroAtualizado = {
            ...carro,
            nome_modelo: dadosAtualizados.nomeModelo || carro.nome_modelo,
            marca: dadosAtualizados.nomeMarca || carro.marca, // Preservar marca original se não estiver no resultado
            ano: dadosAtualizados.ano || carro.ano,
            combustivel: dadosAtualizados.combustivel || carro.combustivel,
            num_portas: dadosAtualizados.numPortas || carro.num_portas,
            cor: dadosAtualizados.cor || carro.cor,
            valor: dadosAtualizados.valor || carro.valor
          };
          console.log('Carro após atualização:', carroAtualizado);
          return carroAtualizado;
        }
        return carro;
      });
      console.log('Total de carros após atualização:', carrosAtualizados.length);
      return carrosAtualizados;
    });
  };

  // Função para remover um carro
  const removerCarroDoContexto = (idCarro) => {
    setAllCars(prevCars => prevCars.filter(carro => carro.id !== idCarro));
  };

  // Função para adicionar um carro
  const adicionarCarroAoContexto = (novoCarro) => {
    setAllCars(prevCars => [...prevCars, novoCarro]);
  };

  // Carregar carros na inicialização
  useEffect(() => {
    carregarCarros();
  }, []);

  const value = {
    allCars,
    isLoading,
    carregarCarros,
    atualizarCarroNoContexto,
    removerCarroDoContexto,
    adicionarCarroAoContexto
  };

  return (
    <CarContext.Provider value={value}>
      {children}
    </CarContext.Provider>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [recarregarCarros, setRecarregarCarros] = useState(false);
  const [novoCarroParaAdicionar, setNovoCarroParaAdicionar] = useState(null);
  const [currentView, setCurrentView] = useState('brands'); // 'brands' ou 'cars'
  const [selectedBrand, setSelectedBrand] = useState(null);
  const { allCars, isLoading, carregarCarros, atualizarCarroNoContexto, removerCarroDoContexto, adicionarCarroAoContexto } = useCarContext();
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [carroEmEdicao, setCarroEmEdicao] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [carroParaExcluir, setCarroParaExcluir] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { notification, showSuccess, showError, showDelete, hideNotification } = useNotification();

  // Detectar quando o usuário volta no browser
  useEffect(() => {
    const handlePopState = () => {
      // Se estiver na página inicial e houver resultados de busca, limpar
      if (window.location.pathname === '/' && searchResults.length > 0) {
        setSearchResults([]);
        console.log('🔄 Usuário voltou no browser, limpando busca');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [searchResults.length]);

  // Função para salvar edição
  const lidarComSalvarEdicao = async (idCarro, dadosAtualizados) => {
    try {
      console.log('Salvando edição do carro:', idCarro, dadosAtualizados);
      console.log('Tipo do ID:', typeof idCarro, 'Valor:', idCarro);
      
      // Verificar se o carro ainda existe no estado
      const carroExisteLocal = allCars.find(carro => carro.id === idCarro);
      if (!carroExisteLocal) {
        showError('Carro não encontrado. Pode ter sido removido.');
        setModalEditOpen(false);
        setCarroEmEdicao(null);
        return;
      }
      
      // Converter ID para número se necessário
      const idNumerico = typeof idCarro === 'string' ? parseInt(idCarro, 10) : idCarro;
      console.log('ID convertido:', idNumerico, 'Tipo:', typeof idNumerico);
      
      // Verificar se o carro existe no backend antes de tentar atualizar
      const carroExisteBackend = await verificarSeCarroExiste(idNumerico);
      if (!carroExisteBackend) {
        showError('Carro não encontrado no servidor. Pode ter sido removido.');
        // Remover o carro do estado local
        removerCarroDoContexto(idCarro);
        setModalEditOpen(false);
        setCarroEmEdicao(null);
        return;
      }
      
      // Chamar a API para atualizar
      const resultado = await atualizarCarro(idNumerico, dadosAtualizados);
      
      console.log('Carro atualizado com sucesso:', resultado);
      
      // Fechar modal
      setModalEditOpen(false);
      setCarroEmEdicao(null);
      
      // Atualizar o carro no estado usando os dados retornados pelo backend
      atualizarCarroNoContexto(idCarro, resultado);
      
      showSuccess('Carro atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar carro:', error);
      
      // Se for erro 404, o carro não existe mais
      if (error.message.includes('404')) {
        showError('Carro não encontrado no servidor. Pode ter sido removido.');
        // Remover o carro do estado local
        removerCarroDoContexto(idCarro);
      } else {
        showError(`Erro ao atualizar o carro: ${error.message}`);
      }
      
      setModalEditOpen(false);
      setCarroEmEdicao(null);
    }
  };

  // Função para excluir carro
  const lidarComExclusaoCarro = (carro) => {
    console.log('🎯 TESTE DEPLOY APP.JS - Iniciando exclusão do carro:', carro);
    // Verificar se é carro do backend (pode ser excluído)
    if (carro.origem !== 'backend') {
      showError('Carros da API externa não podem ser excluídos');
      return;
    }
    
    setCarroParaExcluir(carro);
    setModalDeleteOpen(true);
  };

  // Função para confirmar exclusão
  const lidarComConfirmarExclusao = async (idCarro) => {
    try {
      console.log('🎯 TESTE DEPLOY APP.JS - Excluindo carro:', idCarro);
      console.log('Tipo do ID:', typeof idCarro, 'Valor:', idCarro);
      
      // Verificar se o carro ainda existe no estado
      const carroExisteLocal = allCars.find(carro => carro.id === idCarro);
      if (!carroExisteLocal) {
        showError('Carro não encontrado. Pode ter sido removido.');
        setModalDeleteOpen(false);
        setCarroParaExcluir(null);
        return;
      }
      
      // Converter ID para número se necessário
      const idNumerico = typeof idCarro === 'string' ? parseInt(idCarro, 10) : idCarro;
      console.log('ID convertido:', idNumerico, 'Tipo:', typeof idNumerico);
      
      // Verificar se o carro existe no backend antes de tentar excluir
      const carroExisteBackend = await verificarSeCarroExiste(idNumerico);
      if (!carroExisteBackend) {
        showError('Carro não encontrado no servidor. Pode ter sido removido.');
        // Remover o carro do estado local
        removerCarroDoContexto(idCarro);
        setModalDeleteOpen(false);
        setCarroParaExcluir(null);
        return;
      }
      
      // Chamar a API para excluir
      await deletarCarro(idNumerico);
      
      // Fechar modal
      setModalDeleteOpen(false);
      setCarroParaExcluir(null);
      
      // Remover o carro do estado
      removerCarroDoContexto(idCarro);
      
      showDelete('Carro excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir carro:', error);
      
      // Se for erro 404, o carro não existe mais
      if (error.message.includes('404')) {
        showError('Carro não encontrado no servidor. Pode ter sido removido.');
        // Remover o carro do estado local
        removerCarroDoContexto(idCarro);
      } else {
        showError(`Erro ao excluir o carro: ${error.message}`);
      }
      
      setModalDeleteOpen(false);
      setCarroParaExcluir(null);
    }
  };

  // Função para busca de carros
  const handleSearch = ({ brand, model }) => {
    console.log('🔍 === INICIANDO BUSCA ===');
    console.log('Marca selecionada:', brand);
    console.log('Modelo digitado:', model);
    console.log('Total de carros disponíveis:', allCars.length);
    
    setIsSearching(true);
    
    let filteredCars = allCars;
    
    // Filtrar por marca
    if (brand) {
      filteredCars = filteredCars.filter(car => 
        car.marca && car.marca.toLowerCase() === brand.toLowerCase()
      );
      console.log('Carros após filtro por marca:', filteredCars.length);
    }
    
    // Filtrar por modelo
    if (model) {
      filteredCars = filteredCars.filter(car => 
        car.nome_modelo && 
        car.nome_modelo.toLowerCase().includes(model.toLowerCase())
      );
      console.log('Carros após filtro por modelo:', filteredCars.length);
    }
    
    console.log('Resultados finais da busca:', filteredCars.length);
    console.log('Carros encontrados:', filteredCars);
    
    setSearchResults(filteredCars);
    setIsSearching(false);
    
    // Adicionar entrada no histórico do browser
    if (filteredCars.length > 0) {
      const searchParams = new URLSearchParams();
      if (brand) searchParams.set('brand', brand);
      if (model) searchParams.set('model', model);
      const newUrl = `/?${searchParams.toString()}`;
      window.history.pushState({ search: true }, '', newUrl);
    }
    
    console.log('🔍 === BUSCA CONCLUÍDA ===');
  };

  // Função para limpar busca e voltar à listagem
  const handleClearSearch = () => {
    setSearchResults([]);
    // Limpar URL e voltar ao estado inicial
    window.history.pushState({}, '', '/');
    console.log('🔄 Busca limpa, voltando à listagem de marcas');
  };

  // Função para processar carros e criar lista de marcas
  const processarCarrosParaMarcas = (carros) => {
    console.log('Processando carros para marcas. Total de carros:', carros.length);
    const marcasMap = {};
    
    carros.forEach((carro, index) => {
      console.log(`Processando carro ${index + 1}:`, carro);
      
      // Determinar a marca baseada nos dados do carro
      let marca = 'Outros';
      
      // Priorizar a marca que já está definida no carro (para carros criados/editados)
      if (carro.marca && carro.marca.trim() !== '') {
        marca = carro.marca.trim();
        console.log(`Usando marca já definida: ${marca}`);
      } else if (carro.brand === 1) {
        marca = 'Toyota';
      } else if (carro.brand === 2) {
        marca = 'Volkswagen';
      } else if (carro.brand === 3) {
        marca = 'Chevrolet';
      } else if (carro.brand === 4) {
        marca = 'Ford';
      } else if (carro.brand === 5) {
        marca = 'Honda';
      } else if (carro.brand === 6) {
        marca = 'Hyundai';
      } else if (carro.brand === 7) {
        marca = 'Fiat';
      } else if (carro.brand === 8) {
        marca = 'Renault';
      } else if (carro.brand === 9) {
        marca = 'Nissan';
      } else if (carro.brand === 10) {
        marca = 'BMW';
      } else if (carro.brand === 11) {
        marca = 'Mercedes-Benz';
      } else if (carro.brand === 12) {
        marca = 'Audi';
      }
      
      console.log(`Marca final determinada para carro ${index + 1}:`, marca);
      
      // Adicionar a marca ao carro para exibição
      carro.marca = marca;
      
      if (!marcasMap[marca]) {
        marcasMap[marca] = {
          id: marca.toLowerCase().replace(/\s+/g, '-'),
          name: marca,
          carCount: 0,
          cars: []
        };
      }
      marcasMap[marca].carCount++;
      marcasMap[marca].cars.push(carro);
    });
    
    const marcasProcessadas = Object.values(marcasMap).sort((a, b) => b.carCount - a.carCount);
    console.log('Marcas processadas:', marcasProcessadas);
    console.log('Total de marcas encontradas:', marcasProcessadas.length);
    
    return marcasProcessadas;
  };

  // Função para selecionar uma marca
  const handleBrandSelect = (brand) => {
    console.log('Selecionando marca:', brand);
    console.log('Navegando para:', `/brand/${brand.id}`);
    setSelectedBrand(brand);
    navigate(`/brand/${brand.id}`);
  };

  // Função para voltar à lista de marcas
  const handleBackToBrands = () => {
    navigate('/');
  };

  // Função para recarregar dados
  const recarregarDados = () => {
    // O contexto global já gerencia o loading
    carregarCarros();
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
          console.log(`Carro ${carro.nome_modelo} excluído com sucesso`);
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

  const lidarComCriacaoCarro = async (dadosCarro) => {
    try {
      // Validar campos obrigatórios
      const camposObrigatorios = ['nome_modelo', 'marca', 'ano', 'combustivel', 'num_portas', 'cor', 'valor'];
      const camposVazios = camposObrigatorios.filter(campo => !dadosCarro[campo] || dadosCarro[campo] === '');
      
      if (camposVazios.length > 0) {
        throw new Error(`Campos obrigatórios não preenchidos: ${camposVazios.join(', ')}`);
      }
      
      // LOG DETALHADO DOS DADOS:
      console.log('🚗 === DADOS SENDO ENVIADOS === 🚗');
      console.log('Dados completos:', dadosCarro);
      console.log('Tipo dos dados:', typeof dadosCarro);
      console.log('Chaves dos dados:', Object.keys(dadosCarro));
      console.log('🚗 ========================== 🚗');
      
      // Mapear dados para o formato que o backend espera
      const dadosParaBackend = {
        nomeModelo: dadosCarro.nome_modelo,
        nomeMarca: dadosCarro.marca,
        ano: parseInt(dadosCarro.ano),
        combustivel: dadosCarro.combustivel,
        numPortas: parseInt(dadosCarro.num_portas),
        cor: dadosCarro.cor,
        valor: parseFloat(dadosCarro.valor)
      };
      
      console.log('🚗 === DADOS MAPEADOS PARA BACKEND === 🚗');
      console.log('Dados mapeados:', dadosParaBackend);
      console.log('🚗 ===================================== 🚗');
      
      // Chamar API do backend
      const resultado = await criarCarro(dadosParaBackend);
      
      console.log('Carro cadastrado no backend:', resultado);
      
      // Adicionar o novo carro diretamente ao estado allCars
      const novoCarro = {
        id: resultado.id,
        nome_modelo: resultado.nomeModelo,
        marca: resultado.nomeMarca,
        ano: resultado.ano,
        combustivel: resultado.combustivel,
        num_portas: resultado.numPortas,
        cor: resultado.cor,
        valor: resultado.valor,
        timestamp_cadastro: resultado.timestampCadastro,
        origem: 'backend'
      };
      
      // Adicionar o novo carro ao estado
      adicionarCarroAoContexto(novoCarro);
      
      setMostrarFormulario(false);
      showSuccess('Carro cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      showError(`Erro ao cadastrar o carro: ${error.message}`);
    }
  };

  // Função para editar carro
  const lidarComEdicaoCarro = (carro) => {
    // Verificar se é carro do backend (pode ser editado)
    if (carro.origem !== 'backend') {
      showError('Carros da API externa não podem ser editados');
      return;
    }
    
    setCarroEmEdicao(carro);
    setModalEditOpen(true);
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
              onSubmit={lidarComCriacaoCarro}
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
                           <span className="search-count">{searchResults.length} carro{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}</span>
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
        onClose={() => {
          setModalEditOpen(false);
          setCarroEmEdicao(null);
        }}
        onSave={lidarComSalvarEdicao}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        car={carroParaExcluir}
        isOpen={modalDeleteOpen}
        onClose={() => {
          setModalDeleteOpen(false);
          setCarroParaExcluir(null);
        }}
        onConfirm={lidarComConfirmarExclusao}
      />
    </div>
  );
}

// Componente principal com rotas
function AppWithRouter() {
  return (
    <Router>
      <CarProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/brand/:brandId" element={<BrandCarsPage />} />
        </Routes>
      </CarProvider>
    </Router>
  );
}

// Componente para a página de carros de uma marca
function BrandCarsPage() {
  const navigate = useNavigate();
  const { brandId } = useParams();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const { allCars, isLoading, atualizarCarroNoContexto, removerCarroDoContexto } = useCarContext();
  const { notification, showSuccess, showError, showDelete, hideNotification } = useNotification();

  // Função para processar carros para marcas (copiada do AppContent)
  const processarCarrosParaMarcas = (carros) => {
    console.log('Processando carros para marcas:', carros);
    const marcasMap = {};
    
    carros.forEach(carro => {
      // Determinar a marca baseada nos dados do carro
      let marca = 'Outros';
      
      if (carro.marca) {
        marca = carro.marca;
      } else if (carro.brand === 1) {
        marca = 'Toyota';
      } else if (carro.brand === 2) {
        marca = 'Volkswagen';
      } else if (carro.brand === 3) {
        marca = 'Chevrolet';
      } else if (carro.brand === 4) {
        marca = 'Ford';
      } else if (carro.brand === 5) {
        marca = 'Honda';
      } else if (carro.brand === 6) {
        marca = 'Hyundai';
      } else if (carro.brand === 7) {
        marca = 'Fiat';
      } else if (carro.brand === 8) {
        marca = 'Renault';
      } else if (carro.brand === 9) {
        marca = 'Nissan';
      } else if (carro.brand === 10) {
        marca = 'BMW';
      } else if (carro.brand === 11) {
        marca = 'Mercedes-Benz';
      } else if (carro.brand === 12) {
        marca = 'Audi';
      }
      
      // Adicionar a marca ao carro para exibição
      carro.marca = marca;
      
      if (!marcasMap[marca]) {
        marcasMap[marca] = {
          id: marca.toLowerCase().replace(/\s+/g, '-'),
          name: marca,
          carCount: 0,
          cars: []
        };
      }
      marcasMap[marca].carCount++;
      marcasMap[marca].cars.push(carro);
    });
    
    // Ordenar marcas por número de carros (decrescente)
    const resultado = Object.values(marcasMap).sort((a, b) => b.carCount - a.carCount);
    console.log('Marcas processadas:', resultado);
    return resultado;
  };

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

  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [carroEmEdicao, setCarroEmEdicao] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [carroParaExcluir, setCarroParaExcluir] = useState(null);

  const lidarComEdicaoCarro = (carro) => {
    if (carro.origem !== 'backend') {
      showError('Carros da API externa não podem ser editados');
      return;
    }
    console.log('Editando carro:', carro);
    setCarroEmEdicao(carro);
    setModalEditOpen(true);
  };

  const lidarComExclusaoCarro = (carro) => {
    if (carro.origem !== 'backend') {
      showError('Carros da API externa não podem ser excluídos');
      return;
    }
    console.log('Excluindo carro:', carro);
    setCarroParaExcluir(carro);
    setModalDeleteOpen(true);
  };

  // Função para salvar edição (versão simplificada para BrandCarsPage)
  const lidarComSalvarEdicao = async (idCarro, dadosAtualizados) => {
    try {
      console.log('Salvando edição do carro:', idCarro, dadosAtualizados);
      
      // Converter ID para número se necessário
      const idNumerico = typeof idCarro === 'string' ? parseInt(idCarro, 10) : idCarro;
      
      // Chamar a API para atualizar
      const resultado = await atualizarCarro(idNumerico, dadosAtualizados);
      
      console.log('Carro atualizado com sucesso:', resultado);
      
      // Fechar modal
      setModalEditOpen(false);
      setCarroEmEdicao(null);
      
      // Atualizar o carro no estado
      atualizarCarroNoContexto(idCarro, resultado);
      
      showSuccess('Carro atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar carro:', error);
      showError(`Erro ao atualizar o carro: ${error.message}`);
      setModalEditOpen(false);
      setCarroEmEdicao(null);
    }
  };

  // Função para confirmar exclusão (versão simplificada para BrandCarsPage)
  const lidarComConfirmarExclusao = async (idCarro) => {
    try {
      console.log('Excluindo carro:', idCarro);
      
      // Converter ID para número se necessário
      const idNumerico = typeof idCarro === 'string' ? parseInt(idCarro, 10) : idCarro;
      
      // Chamar a API para excluir
      await deletarCarro(idNumerico);
      
      // Fechar modal
      setModalDeleteOpen(false);
      setCarroParaExcluir(null);
      
      // Remover o carro do estado
      removerCarroDoContexto(idCarro);
      
      showDelete('Carro excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir carro:', error);
      showError(`Erro ao excluir o carro: ${error.message}`);
      setModalDeleteOpen(false);
      setCarroParaExcluir(null);
    }
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
          onClose={() => {
            setModalEditOpen(false);
            setCarroEmEdicao(null);
          }}
        />
      )}

      {modalDeleteOpen && carroParaExcluir && (
        <DeleteConfirmModal
          isOpen={modalDeleteOpen}
          car={carroParaExcluir}
          onConfirm={lidarComConfirmarExclusao}
          onClose={() => {
            setModalDeleteOpen(false);
            setCarroParaExcluir(null);
          }}
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
}

export default AppWithRouter;
