import React, { useState } from 'react';
import './CarForm.css';

const CarForm = ({ onSubmit, onCancel }) => {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome_modelo: '',
    ano: '',
    combustivel: '',
    num_portas: '',
    cor: '',
    valor: '',
    marca: ''
  });

  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);

  // Opções para os selects
  const opcoesCombustivel = [
    { value: '', label: 'Selecione o combustível' },
    { value: 'FLEX', label: 'Flex' },
    { value: 'GASOLINA', label: 'Gasolina' },
    { value: 'DIESEL', label: 'Diesel' },
    { value: 'ELETRICO', label: 'Elétrico' },
    { value: 'HIBRIDO', label: 'Híbrido' }
  ];

  const opcoesPortas = [
    { value: '', label: 'Selecione o número de portas' },
    { value: '2', label: '2 portas' },
    { value: '4', label: '4 portas' }
  ];
  
  const opcoesCor = [
    { value: '', label: 'Selecione a cor' },
    { value: 'BRANCO', label: 'Branco' },
    { value: 'PRETO', label: 'Preto' },
    { value: 'AZUL', label: 'Azul' },
    { value: 'VERMELHO', label: 'Vermelho' },
    { value: 'PRATA', label: 'Prata' },
    { value: 'CINZA', label: 'Cinza' },
    { value: 'BEGE', label: 'Bege' },
    { value: 'VERDE', label: 'Verde' },
    { value: 'AMARELO', label: 'Amarelo' },
    { value: 'LARANJA', label: 'Laranja' }
  ];

  const opcoesMarca = [
    { value: '', label: 'Selecione a marca' },
    { value: 'Toyota', label: 'Toyota' },
    { value: 'Chevrolet', label: 'Chevrolet' },
    { value: 'Volkswagen', label: 'Volkswagen' },
    { value: 'Ford', label: 'Ford' },
    { value: 'Honda', label: 'Honda' },
    { value: 'Fiat', label: 'Fiat' },
    { value: 'Hyundai', label: 'Hyundai' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
    { value: 'Audi', label: 'Audi' },
    { value: 'Nissan', label: 'Nissan' },
    { value: 'Renault', label: 'Renault' },
    { value: 'Peugeot', label: 'Peugeot' },
    { value: 'Citroën', label: 'Citroën' },
    { value: 'Kia', label: 'Kia' },
    { value: 'Mitsubishi', label: 'Mitsubishi' },
    { value: 'Subaru', label: 'Subaru' },
    { value: 'Volvo', label: 'Volvo' },
    { value: 'Land Rover', label: 'Land Rover' },
    { value: 'Jaguar', label: 'Jaguar' },
    { value: 'Porsche', label: 'Porsche' },
    { value: 'Ferrari', label: 'Ferrari' },
    { value: 'Lamborghini', label: 'Lamborghini' },
    { value: 'Maserati', label: 'Maserati' },
    { value: 'Alfa Romeo', label: 'Alfa Romeo' },
    { value: 'Lexus', label: 'Lexus' },
    { value: 'Infiniti', label: 'Infiniti' },
    { value: 'Acura', label: 'Acura' },
    { value: 'Outros', label: 'Outros' }
  ];

  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setDadosFormulario(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpar erro do campo quando usuário começa a digitar
    if (erros[name]) {
      setErros(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const novosErros = {};

    // Validar marca
    if (!dadosFormulario.marca.trim()) {
      novosErros.marca = 'Marca é obrigatória';
    }

    // Validar modelo
    if (!dadosFormulario.nome_modelo.trim()) {
      novosErros.nome_modelo = 'Modelo é obrigatório';
    } else if (dadosFormulario.nome_modelo.trim().length < 2) {
      novosErros.nome_modelo = 'Modelo deve ter pelo menos 2 caracteres';
    }

    // Validar ano
    if (!dadosFormulario.ano) {
      novosErros.ano = 'Ano é obrigatório';
    } else {
      const ano = parseInt(dadosFormulario.ano);
      const anoAtual = new Date().getFullYear();
      if (ano < 1900 || ano > anoAtual + 1) {
        novosErros.ano = `Ano deve estar entre 1900 e ${anoAtual + 1}`;
      }
    }

    // Validar combustível
    if (!dadosFormulario.combustivel) {
      novosErros.combustivel = 'Combustível é obrigatório';
    }

    // Validar número de portas
    if (!dadosFormulario.num_portas) {
      novosErros.num_portas = 'Número de portas é obrigatório';
    }

    // Validar cor
    if (!dadosFormulario.cor) {
      novosErros.cor = 'Cor é obrigatória';
    }

    // Validar valor
    if (!dadosFormulario.valor) {
      novosErros.valor = 'Valor é obrigatório';
    } else {
      const valor = parseFloat(dadosFormulario.valor);
      if (isNaN(valor) || valor <= 0) {
        novosErros.valor = 'Valor deve ser um número positivo';
      }
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const lidarComEnvio = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setEnviando(true);

    try {
      // Preparar dados para envio
      const dadosParaEnvio = {
        ...dadosFormulario,
        valor: parseFloat(dadosFormulario.valor),
        ano: parseInt(dadosFormulario.ano),
        num_portas: parseInt(dadosFormulario.num_portas)
      };

      await onSubmit(dadosParaEnvio);

      // Limpar formulário após sucesso
      setDadosFormulario({
        nome_modelo: '',
        ano: '',
        combustivel: '',
        num_portas: '',
        cor: '',
        valor: '',
        marca: ''
      });
      setErros({});
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="car-form">
              <div className="form-header">
          <h2>Adicionar Novo Carro</h2>
          <p>Preencha os dados do veículo</p>
        </div>

      <form onSubmit={lidarComEnvio} className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="marca">Marca *</label>
            <select
              id="marca"
              name="marca"
              value={dadosFormulario.marca}
              onChange={lidarComMudanca}
              className={erros.marca ? 'error' : ''}
            >
              {opcoesMarca.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {erros.marca && <span className="error-message">{erros.marca}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="nome_modelo">Modelo *</label>
            <input
              type="text"
              id="nome_modelo"
              name="nome_modelo"
              value={dadosFormulario.nome_modelo}
              onChange={lidarComMudanca}
              placeholder="Ex: Golf GTI"
              className={erros.nome_modelo ? 'error' : ''}
            />
            {erros.nome_modelo && <span className="error-message">{erros.nome_modelo}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ano">Ano *</label>
            <input
              type="number"
              id="ano"
              name="ano"
              value={dadosFormulario.ano}
              onChange={lidarComMudanca}
              placeholder="Ex: 2023"
              min="1900"
              max={new Date().getFullYear() + 1}
              className={erros.ano ? 'error' : ''}
            />
            {erros.ano && <span className="error-message">{erros.ano}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="combustivel">Combustível *</label>
            <select
              id="combustivel"
              name="combustivel"
              value={dadosFormulario.combustivel}
              onChange={lidarComMudanca}
              className={erros.combustivel ? 'error' : ''}
            >
              {opcoesCombustivel.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {erros.combustivel && <span className="error-message">{erros.combustivel}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="num_portas">Número de Portas *</label>
            <select
              id="num_portas"
              name="num_portas"
              value={dadosFormulario.num_portas}
              onChange={lidarComMudanca}
              className={erros.num_portas ? 'error' : ''}
            >
              {opcoesPortas.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {erros.num_portas && <span className="error-message">{erros.num_portas}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cor">Cor *</label>
            <select
              id="cor"
              name="cor"
              value={dadosFormulario.cor}
              onChange={lidarComMudanca}
              className={erros.cor ? 'error' : ''}
            >
              {opcoesCor.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {erros.cor && <span className="error-message">{erros.cor}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="valor">Valor (R$) *</label>
          <input
            type="number"
            id="valor"
            name="valor"
            value={dadosFormulario.valor}
            onChange={lidarComMudanca}
            placeholder="Ex: 132851.99"
            min="0"
            step="0.01"
            className={erros.valor ? 'error' : ''}
          />
          {erros.valor && <span className="error-message">{erros.valor}</span>}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="form-button secondary"
            disabled={enviando}
          >
            <span className="button-icon">❌</span>
            <span className="button-text">Cancelar</span>
          </button>
          <button
            type="submit"
            className="form-button primary"
            disabled={enviando}
          >
            {enviando ? (
              <>
                <span className="loading-spinner"></span>
                <span className="button-text">Salvando...</span>
              </>
            ) : (
              <>
                <span className="button-icon">✅</span>
                <span className="button-text">Salvar Carro</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
