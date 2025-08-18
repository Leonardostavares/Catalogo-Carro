// URL do backend Heroku
const URL_BASE_BACKEND = process.env.REACT_APP_BACKEND_URL || 'https://car-catalog-backend-leonardo.herokuapp.com';

const buscarComTratamentoErro = async (url, opcoes = {}) => {
  try {
    const resposta = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...opcoes.headers
      },
      ...opcoes
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP! status: ${resposta.status}`);
    }

    return await resposta.json();
  } catch (erro) {
    throw new Error(`Falha na comunicação com o servidor: ${erro.message}`);
  }
};

export const obterCarrosDoBackend = async () => {
  try {
    const dados = await buscarComTratamentoErro(`${URL_BASE_BACKEND}/api/carros`);
    return dados || [];
  } catch (erro) {
    throw erro;
  }
};

export const criarCarro = async (dadosCarro) => {
  try {
    const resposta = await fetch(`${URL_BASE_BACKEND}/api/carros`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosCarro)
    });

    if (!resposta.ok) {
      const erroData = await resposta.json();
      throw new Error(erroData.message || erroData.error || `Erro HTTP! status: ${resposta.status}`);
    }

    return await resposta.json();
  } catch (erro) {
    throw new Error('Falha ao cadastrar o carro. Tente novamente.');
  }
};

export const atualizarCarro = async (idCarro, dadosCarro) => {
  try {
    const resposta = await fetch(`${URL_BASE_BACKEND}/api/carros/${idCarro}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosCarro)
    });

    if (!resposta.ok) {
      const erroData = await resposta.json();
      throw new Error(erroData.message || erroData.error || `Erro HTTP! status: ${resposta.status}`);
    }

    const resultado = await resposta.json();
    return {
      sucesso: true,
      mensagem: 'Carro atualizado com sucesso!',
      carro: resultado
    };
  } catch (erro) {
    throw new Error('Falha ao atualizar o carro. Tente novamente.');
  }
};

export const deletarCarro = async (idCarro) => {
  try {
    const resposta = await fetch(`${URL_BASE_BACKEND}/api/carros/${idCarro}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!resposta.ok) {
      if (resposta.status === 404) {
        throw new Error('Carro não encontrado');
      }
      throw new Error(`Erro HTTP! status: ${resposta.status}`);
    }

    return {
      sucesso: true,
      mensagem: 'Carro deletado com sucesso!'
    };
  } catch (erro) {
    throw new Error('Falha ao deletar o carro. Tente novamente.');
  }
};

export const verificarSeCarroExiste = async (idCarro) => {
  try {
    const resposta = await fetch(`${URL_BASE_BACKEND}/api/carros/${idCarro}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return resposta.ok;
  } catch (erro) {
    return false;
  }
};

export const limparCache = () => {
  // Função para limpar cache (não faz nada no frontend, mas mantém compatibilidade)
  if (typeof window !== 'undefined') {
    localStorage.clear();
    sessionStorage.clear();
  }
};
