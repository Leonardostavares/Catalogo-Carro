import React, { createContext, useContext, useState, useEffect } from 'react';
import { obterCarrosDoBackend, limparCache } from '../services/api';

const CarContext = createContext();

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCarContext deve ser usado dentro de um CarProvider');
  }
  return context;
};

export function CarProvider({ children }) {
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const carregarCarros = async () => {
    try {
      setIsLoading(true);
      
      // Limpar cache
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
      limparCache();
      
      // Timeout para evitar loading infinito
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 10000);
      
      // Buscar carros do backend
      let carrosBackend = [];
      try {
        carrosBackend = await obterCarrosDoBackend();
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

  const atualizarCarroNoContexto = (idCarro, dadosAtualizados) => {
    setAllCars(prevCars => {
      const carrosAtualizados = prevCars.map(carro => {
        if (carro.id === idCarro) {
          const carroAtualizado = {
            ...carro,
            nome_modelo: dadosAtualizados.nomeModelo || carro.nome_modelo,
            marca: dadosAtualizados.nomeMarca || carro.marca,
            ano: dadosAtualizados.ano || carro.ano,
            combustivel: dadosAtualizados.combustivel || carro.combustivel,
            num_portas: dadosAtualizados.numPortas || carro.num_portas,
            cor: dadosAtualizados.cor || carro.cor,
            valor: dadosAtualizados.valor || carro.valor
          };
          return carroAtualizado;
        }
        return carro;
      });
      return carrosAtualizados;
    });
  };

  const removerCarroDoContexto = (idCarro) => {
    setAllCars(prevCars => prevCars.filter(carro => carro.id !== idCarro));
  };

  const adicionarCarroAoContexto = (novoCarro) => {
    setAllCars(prevCars => [...prevCars, novoCarro]);
  };

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
