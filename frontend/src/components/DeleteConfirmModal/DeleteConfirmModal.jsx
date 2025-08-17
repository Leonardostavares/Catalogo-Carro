import React from 'react';
import './DeleteConfirmModal.css';

const DeleteConfirmModal = ({ car, isOpen, onClose, onConfirm }) => {
  if (!isOpen || !car) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header delete-header">
          <h2>🗑️ Excluir Carro</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="delete-content">
          <div className="warning-icon">⚠️</div>
          <h3>Tem certeza que deseja excluir este carro?</h3>
          
          <div className="car-details">
            <p><strong>Modelo:</strong> {car.nome_modelo}</p>
            <p><strong>Ano:</strong> {car.ano}</p>
            <p><strong>Cor:</strong> {car.cor}</p>
            <p><strong>Combustível:</strong> {car.combustivel}</p>
          </div>
          
          <p className="warning-text">
            Esta ação não pode ser desfeita. O carro será removido permanentemente do catálogo.
          </p>
        </div>

        <div className="form-actions">
          <button onClick={onClose} className="cancel-btn">
            Cancelar
          </button>
          <button onClick={() => onConfirm(car.id)} className="delete-confirm-btn">
            🗑️ Excluir Definitivamente
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
