import { useState } from 'react';
import { useCarContext } from '../contexts/CarContext';
import { criarCarro, atualizarCarro, deletarCarro, verificarSeCarroExiste } from '../services/api';
import { validarCarro, mapearDadosParaBackend, mapearDadosDoBackend } from '../utils/carUtils';
import useNotification from './useNotification';

export const useCarManagement = () => {
  const { allCars, atualizarCarroNoContexto, removerCarroDoContexto, adicionarCarroAoContexto } = useCarContext();
  const { showSuccess, showError, showDelete } = useNotification();
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [carroEmEdicao, setCarroEmEdicao] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [carroParaExcluir, setCarroParaExcluir] = useState(null);

  const lidarComCriacaoCarro = async (dadosCarro) => {
    try {
      // Validar campos obrigatórios
      const validacao = validarCarro(dadosCarro);
      if (!validacao.isValid) {
        throw new Error(`Campos obrigatórios não preenchidos: ${validacao.errors.join(', ')}`);
      }
      
      // Mapear dados para o formato que o backend espera
      const dadosParaBackend = mapearDadosParaBackend(dadosCarro);
      
      // Chamar API do backend
      const resultado = await criarCarro(dadosParaBackend);
      
      // Adicionar o novo carro ao estado
      const novoCarro = mapearDadosDoBackend(resultado);
      adicionarCarroAoContexto(novoCarro);
      
      showSuccess('Carro cadastrado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      showError(`Erro ao cadastrar o carro: ${error.message}`);
      return false;
    }
  };

  const lidarComEdicaoCarro = (carro) => {
    if (carro.origem !== 'backend') {
      showError('Carros da API externa não podem ser editados');
      return;
    }
    setCarroEmEdicao(carro);
    setModalEditOpen(true);
  };

  const lidarComSalvarEdicao = async (idCarro, dadosAtualizados) => {
    try {
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
      
      // Verificar se o carro existe no backend antes de tentar atualizar
      const carroExisteBackend = await verificarSeCarroExiste(idNumerico);
      if (!carroExisteBackend) {
        showError('Carro não encontrado no servidor. Pode ter sido removido.');
        removerCarroDoContexto(idCarro);
        setModalEditOpen(false);
        setCarroEmEdicao(null);
        return;
      }
      
      // Chamar a API para atualizar
      const resultado = await atualizarCarro(idNumerico, dadosAtualizados);
      
      // Fechar modal
      setModalEditOpen(false);
      setCarroEmEdicao(null);
      
      // Atualizar o carro no estado
      atualizarCarroNoContexto(idCarro, resultado);
      
      showSuccess('Carro atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar carro:', error);
      
      if (error.message.includes('404')) {
        showError('Carro não encontrado no servidor. Pode ter sido removido.');
        removerCarroDoContexto(idCarro);
      } else {
        showError(`Erro ao atualizar o carro: ${error.message}`);
      }
      
      setModalEditOpen(false);
      setCarroEmEdicao(null);
    }
  };

  const lidarComExclusaoCarro = (carro) => {
    if (carro.origem !== 'backend') {
      showError('Carros da API externa não podem ser excluídos');
      return;
    }
    setCarroParaExcluir(carro);
    setModalDeleteOpen(true);
  };

  const lidarComConfirmarExclusao = async (idCarro) => {
    try {
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
      
      // Verificar se o carro existe no backend antes de tentar excluir
      const carroExisteBackend = await verificarSeCarroExiste(idNumerico);
      if (!carroExisteBackend) {
        showError('Carro não encontrado no servidor. Pode ter sido removido.');
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
      
      if (error.message.includes('404')) {
        showError('Carro não encontrado no servidor. Pode ter sido removido.');
        removerCarroDoContexto(idCarro);
      } else {
        showError(`Erro ao excluir o carro: ${error.message}`);
      }
      
      setModalDeleteOpen(false);
      setCarroParaExcluir(null);
    }
  };

  const fecharModalEdicao = () => {
    setModalEditOpen(false);
    setCarroEmEdicao(null);
  };

  const fecharModalExclusao = () => {
    setModalDeleteOpen(false);
    setCarroParaExcluir(null);
  };

  return {
    // Estados dos modais
    modalEditOpen,
    carroEmEdicao,
    modalDeleteOpen,
    carroParaExcluir,
    
    // Funções de gerenciamento
    lidarComCriacaoCarro,
    lidarComEdicaoCarro,
    lidarComSalvarEdicao,
    lidarComExclusaoCarro,
    lidarComConfirmarExclusao,
    
    // Funções de fechamento
    fecharModalEdicao,
    fecharModalExclusao
  };
};
