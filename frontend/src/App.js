import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarProvider } from './contexts/CarContext';
import HomePage from './pages/HomePage';
import BrandPage from './pages/BrandPage';
import './App.css';

/**
 * Componente principal da aplicação
 * Gerencia o roteamento e o contexto global
 */
function App() {
  return (
    <Router>
      <CarProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/brand/:brandId" element={<BrandPage />} />
        </Routes>
      </CarProvider>
    </Router>
  );
}

export default App;
