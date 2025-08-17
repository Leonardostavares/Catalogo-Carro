import React from 'react';
import './CarCard.css';

const CarCard = ({ car, onEdit, onDelete }) => {
  // Função para verificar se é carro local (cadastrado pelo sistema)
  const isCarroLocal = (carro) => {
    // Carros locais são os que têm origem 'backend' ou não têm origem definida
    // E também carros com ID >= 1000 (que são do backend)
    return carro.origem === 'backend' || !carro.origem || (carro.id && carro.id >= 1000);
  };

  // Função para verificar se é carro do consumo do frontend
  const isCarroConsumoFrontend = (carro) => {
    // Carros do consumo do frontend são os que têm origem 'api_externa'
    return carro.origem === 'api_externa';
  };

  // Função para verificar se é carro da API externa
  const isCarroAPIExterna = (carro) => {
    // Esta função não é mais necessária, pois todos os carros externos são do consumo
    return false;
  };

  // Função para formatar preço
  const formatPrice = (price, carro) => {
    if (!price) return 'Preço não informado';
    
    // Converter para número se for string
    let numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    // Multiplicar por 1000 apenas para carros da API externa
    if (carro && carro.origem === 'api_externa') {
      numericPrice = numericPrice * 1000;
    }
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numericPrice);
  };

  // Função para formatar data
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Data não informada';
    const date = new Date(timestamp * 1000); // Converte de Unix timestamp
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Função para formatar combustível
  const formatFuel = (fuel) => {
    if (!fuel) return 'Não informado';
    const fuelMap = {
      'FLEX': 'Flex',
      'DIESEL': 'Diesel',
      'GASOLINA': 'Gasolina',
      'ELETRICO': 'Elétrico',
      'HIBRIDO': 'Híbrido'
    };
    return fuelMap[fuel] || fuel;
  };

  // Função para formatar cor
  const formatColor = (color) => {
    if (!color) return 'Não informada';
    return color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
  };

  const carroLocal = isCarroLocal(car);
  const carroConsumoFrontend = isCarroConsumoFrontend(car);

  // Determinar a classe CSS baseada no tipo de carro
  let carroClass = 'carro-local'; // padrão
  if (carroConsumoFrontend) {
    carroClass = 'carro-consumo-frontend';
  }

  return (
    <div className={`car-card ${carroConsumoFrontend ? 'external' : ''}`}>
      <div className="car-header">
        <h3 className="car-title">{car.nome_modelo || 'Modelo não informado'}</h3>
        <div className="car-price">{formatPrice(car.valor, car)}</div>
      </div>

      <div className="car-details">
        <div className="car-detail">
          <span className="detail-label">Marca</span>
          <span className="detail-value">{car.marca || 'Não informada'}</span>
        </div>
        <div className="car-detail">
          <span className="detail-label">Ano</span>
          <span className="detail-value">{car.ano || 'Não informado'}</span>
        </div>
        <div className="car-detail">
          <span className="detail-label">Combustível</span>
          <span className="detail-value">{formatFuel(car.combustivel)}</span>
        </div>
        <div className="car-detail">
          <span className="detail-label">Portas</span>
          <span className="detail-value">{car.num_portas || 'N/I'}</span>
        </div>
        <div className="car-detail">
          <span className="detail-label">Cor</span>
          <span className="detail-value">{formatColor(car.cor)}</span>
        </div>
        <div className="car-detail">
          <span className="detail-label">Cadastro</span>
          <span className="detail-value">{formatDate(car.timestamp_cadastro)}</span>
        </div>
      </div>

      {/* Botões apenas para carros locais */}
      {carroLocal ? (
        <div className="car-actions">
          <button 
            className="car-button edit"
            onClick={() => onEdit && onEdit(car)}
            title="Editar carro"
          >
            <span className="button-icon">✏️</span>
            <span className="button-text">Editar</span>
          </button>
          <button 
            className="car-button delete"
            onClick={() => onDelete && onDelete(car)}
            title="Excluir carro"
          >
            <span className="button-icon">🗑️</span>
            <span className="button-text">Excluir</span>
          </button>
        </div>
      ) : (
        /* Aviso para carros da API externa */
        <div className="api-external-notice">
          <span className="notice-icon">ℹ️</span>
          <span className="notice-text">Dados da API externa WSWork</span>
        </div>
      )}
    </div>
  );
};

export default CarCard;
