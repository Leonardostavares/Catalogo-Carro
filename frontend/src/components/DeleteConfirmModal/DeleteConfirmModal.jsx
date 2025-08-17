import React from 'react';
import './DeleteConfirmModal.css';

const DeleteConfirmModal = ({ car, isOpen, onClose, onConfirm }) => {
  if (!isOpen || !car) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header delete-header">
          <div className="delete-icon">🗑️</div>
          <h2>Excluir Carro</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="delete-content">
          <div className="warning-message">
            <div className="warning-icon">⚠️</div>
            <h3>Tem certeza que deseja excluir este carro?</h3>
            <p>Esta ação não pode ser desfeita e o carro será removido permanentemente do catálogo.</p>
          </div>
          
          <div className="car-details">
            <h4>Detalhes do Carro</h4>
            <div className="car-info-grid">
              <div className="car-info-item">
                <span className="car-info-label">Modelo</span>
                <span className="car-info-value">{car.nome_modelo}</span>
              </div>
              <div className="car-info-item">
                <span className="car-info-label">Ano</span>
                <span className="car-info-value">{car.ano}</span>
              </div>
              <div className="car-info-item">
                <span className="car-info-label">Cor</span>
                <span className="car-info-value">{car.cor}</span>
              </div>
              <div className="car-info-item">
                <span className="car-info-label">Combustível</span>
                <span className="car-info-value">{car.combustivel}</span>
              </div>
            </div>
          </div>
          
          <div className="warning-text">
            <p>⚠️ O carro será removido permanentemente do catálogo.</p>
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">
            Cancelar
          </button>
          <button onClick={() => onConfirm(car.id)} className="delete-confirm-btn">
            🗑️ Remover do Catálogo
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
