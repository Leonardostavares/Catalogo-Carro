import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './EditCarModal.css';

const EditCarModal = ({ car, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nome_modelo: '',
    ano: '',
    combustivel: '',
    num_portas: '',
    cor: '',
    valor: ''
  });

  // Preencher formulário quando carro for carregado
  useEffect(() => {
    if (car) {
      setFormData({
        nome_modelo: car.nome_modelo || '',
        ano: car.ano || '',
        combustivel: car.combustivel || '',
        num_portas: car.num_portas || '',
        cor: car.cor || '',
        valor: car.valor ? car.valor.toString() : '' // Manter o valor original
      });
    }
  }, [car]);

  // Forçar scroll para o topo quando modal abrir
  useEffect(() => {
    if (isOpen) {
      // Adicionar classe ao body para prevenir scroll
      document.body.classList.add('modal-open');
      // Forçar scroll para o topo imediatamente
      window.scrollTo(0, 0);
      // E também com comportamento suave após um pequeno delay
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      // Remover classe do body quando modal fechar
      document.body.classList.remove('modal-open');
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar dados
    if (!formData.nome_modelo.trim()) {
      alert('Por favor, preencha o nome do modelo.');
      return;
    }

    if (!formData.ano || formData.ano < 1900 || formData.ano > new Date().getFullYear() + 1) {
      alert('Por favor, insira um ano válido.');
      return;
    }

    if (!formData.combustivel) {
      alert('Por favor, selecione o combustível.');
      return;
    }

    if (!formData.num_portas) {
      alert('Por favor, selecione o número de portas.');
      return;
    }

    if (!formData.cor.trim()) {
      alert('Por favor, preencha a cor.');
      return;
    }

    if (!formData.valor || formData.valor <= 0) {
      alert('Por favor, insira um valor válido.');
      return;
    }

    // Preparar dados para envio
    const dadosAtualizados = {
      ...formData,
      valor: parseFloat(formData.valor), // Manter o valor original
      ano: parseInt(formData.ano),
      numPortas: parseInt(formData.num_portas), // Corrigido: usar numPortas para o backend
      nomeModelo: formData.nome_modelo, // Corrigido: mapear nome_modelo para nomeModelo
      nomeMarca: car.marca // Incluir a marca do carro para o backend
      // NÃO enviar modeloId para não alterar o modelo do carro
    };

    onSave(car.id, dadosAtualizados);
  };

  if (!isOpen || !car) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>✏️ Editar Carro</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome_modelo">Nome do Modelo:</label>
              <input
                type="text"
                id="nome_modelo"
                name="nome_modelo"
                value={formData.nome_modelo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="ano">Ano:</label>
              <input
                type="number"
                id="ano"
                name="ano"
                value={formData.ano}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="combustivel">Combustível:</label>
              <select
                id="combustivel"
                name="combustivel"
                value={formData.combustivel}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione...</option>
                <option value="FLEX">Flex</option>
                <option value="GASOLINA">Gasolina</option>
                <option value="DIESEL">Diesel</option>
                <option value="ELETRICO">Elétrico</option>
                <option value="HIBRIDO">Híbrido</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="num_portas">Número de Portas:</label>
              <select
                id="num_portas"
                name="num_portas"
                value={formData.num_portas}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione...</option>
                <option value="2">2 portas</option>
                <option value="3">3 portas</option>
                <option value="4">4 portas</option>
                <option value="5">5 portas</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cor">Cor:</label>
              <input
                type="text"
                id="cor"
                name="cor"
                value={formData.cor}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="valor">Valor (R$):</label>
              <input
                type="number"
                id="valor"
                name="valor"
                value={formData.valor}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                placeholder="Ex: 132851.99"
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="modal-button secondary">
              <span className="button-icon">❌</span>
              <span className="button-text">Cancelar</span>
            </button>
            <button type="submit" className="modal-button primary">
              <span className="button-icon">💾</span>
              <span className="button-text">Salvar Alterações</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default EditCarModal;
