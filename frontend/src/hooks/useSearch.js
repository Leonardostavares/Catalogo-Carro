import { useState, useEffect } from 'react';
import { useCarContext } from '../contexts/CarContext';
import { filtrarCarros } from '../utils/carUtils';

export const useSearch = () => {
  const { allCars } = useCarContext();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Detectar quando o usuário volta no browser
  useEffect(() => {
    const handlePopState = () => {
      // Se estiver na página inicial e houver resultados de busca, limpar
      if (window.location.pathname === '/' && searchResults.length > 0) {
        setSearchResults([]);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [searchResults.length]);

  const handleSearch = ({ brand, model }) => {
    setIsSearching(true);
    
    // Usar função utilitária para filtrar
    const filteredCars = filtrarCarros(allCars, brand, model);
    
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
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    // Limpar URL e voltar ao estado inicial
    window.history.pushState({}, '', '/');
  };

  return {
    searchResults,
    isSearching,
    handleSearch,
    handleClearSearch
  };
};
