// URLs base da API
const URL_BASE_BACKEND = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

// Função para fazer requisições HTTP com tratamento de erro
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
    console.error(`Erro na requisição para ${url}:`, erro);
    throw new Error(`Falha na comunicação com o servidor: ${erro.message}`);
  }
};

// Buscar carros do backend (JawsDB)
export const obterCarrosDoBackend = async () => {
  try {
    console.log('Buscando carros do backend...');
    const dados = await buscarComTratamentoErro(`${URL_BASE_BACKEND}/api/carros`);
    console.log('Carros obtidos do backend:', dados);
    return dados || [];
  } catch (erro) {
    console.error('Erro ao buscar carros do backend:', erro);
    throw erro;
  }
};

// Criar novo carro (integração com backend)
export const criarCarro = async (dadosCarro) => {
  try {
    console.log('=== API: DADOS RECEBIDOS ===');
    console.log('Dados para enviar:', dadosCarro);
    console.log('JSON stringificado:', JSON.stringify(dadosCarro));
    console.log('==========================');
    
    const resposta = await fetch(`${URL_BASE_BACKEND}/api/carros`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosCarro)
    });

    if (!resposta.ok) {
      try {
        const erroData = await resposta.json();
        console.log('🚨 ERRO DO BACKEND:', erroData);
        
        // Se for erro de validação, formatar as mensagens
        if (typeof erroData === 'object' && !erroData.message && !erroData.error) {
          const mensagensErro = Object.entries(erroData)
            .map(([campo, mensagem]) => `${campo}: ${mensagem}`)
            .join(', ');
          throw new Error(`Erros de validação: ${mensagensErro}`);
        }
        
        throw new Error(erroData.message || erroData.error || `Erro HTTP! status: ${resposta.status}`);
      } catch (parseError) {
        console.log('🚨 ERRO AO PARSEAR RESPOSTA:', parseError);
        throw new Error(`Erro HTTP! status: ${resposta.status}`);
      }
    }

    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao cadastrar carro:', erro);
    throw new Error('Falha ao cadastrar o carro. Tente novamente.');
  }
};

// Atualizar carro existente
export const atualizarCarro = async (idCarro, dadosCarro) => {
  try {
    console.log(`Atualizando carro ${idCarro}:`, dadosCarro);
    console.log(`URL da requisição: ${URL_BASE_BACKEND}/api/carros/${idCarro}`);
    
    const resposta = await fetch(`${URL_BASE_BACKEND}/api/carros/${idCarro}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosCarro)
    });

    if (!resposta.ok) {
      try {
        const erroData = await resposta.json();
        console.log('🚨 ERRO DO BACKEND:', erroData);
        
        // Se for erro de validação, formatar as mensagens
        if (typeof erroData === 'object' && !erroData.message && !erroData.error) {
          const mensagensErro = Object.entries(erroData)
            .map(([campo, mensagem]) => `${campo}: ${mensagem}`)
            .join(', ');
          throw new Error(`Erros de validação: ${mensagensErro}`);
        }
        
        throw new Error(erroData.message || erroData.error || `Erro HTTP! status: ${resposta.status}`);
      } catch (parseError) {
        console.log('🚨 ERRO AO PARSEAR RESPOSTA:', parseError);
        throw new Error(`Erro HTTP! status: ${resposta.status}`);
      }
    }

    const resultado = await resposta.json();
    console.log('Carro atualizado com sucesso:', resultado);
    
    return {
      sucesso: true,
      mensagem: 'Carro atualizado com sucesso!',
      carro: resultado
    };
  } catch (erro) {
    console.error('Erro ao atualizar carro:', erro);
    throw new Error('Falha ao atualizar o carro. Tente novamente.');
  }
};

// Deletar carro
export const deletarCarro = async (idCarro) => {
  try {
    console.log(`Deletando carro ${idCarro}`);
    console.log(`URL da requisição: ${URL_BASE_BACKEND}/api/carros/${idCarro}`);
    
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
    console.error('Erro ao deletar carro:', erro);
    throw new Error('Falha ao deletar o carro. Tente novamente.');
  }
};

// Verificar saúde da API
export const verificarSaudeAPI = async () => {
  try {
    const resposta = await fetch(`${URL_BASE_BACKEND}/api/carros`);
    return {
      online: resposta.ok,
      status: resposta.status,
      statusText: resposta.statusText
    };
  } catch (erro) {
    return {
      online: false,
      erro: erro.message
    };
  }
};

// Verificar se carro existe (debug)
export const verificarSeCarroExiste = async (idCarro) => {
  try {
    console.log(`Verificando se carro ${idCarro} existe...`);
    const resposta = await fetch(`${URL_BASE_BACKEND}/api/carros/debug/existe/${idCarro}`);
    
    if (resposta.ok) {
      const resultado = await resposta.json();
      console.log('Resultado da verificação:', resultado);
      return resultado.existe;
    } else {
      console.log('Erro ao verificar carro:', resposta.status);
      return false;
    }
  } catch (erro) {
    console.error('Erro ao verificar se carro existe:', erro);
    return false;
  }
};

// Função para buscar dados com retry automático
export const buscarComRetry = async (funcaoBusca, maxTentativas = 3) => {
  let ultimoErro;
  
  for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
    try {
      console.log(`Tentativa ${tentativa} de ${maxTentativas}`);
      return await funcaoBusca();
    } catch (erro) {
      ultimoErro = erro;
      console.log(`Tentativa ${tentativa} falhou:`, erro.message);
      
      if (tentativa < maxTentativas) {
        // Aguardar antes da próxima tentativa (backoff exponencial)
        const tempoEspera = Math.pow(2, tentativa) * 1000;
        console.log(`Aguardando ${tempoEspera}ms antes da próxima tentativa...`);
        await new Promise(resolve => setTimeout(resolve, tempoEspera));
      }
    }
  }
  
  throw ultimoErro;
};

// Função para buscar dados com cache
const cache = new Map();
const tempoCache = 5 * 60 * 1000; // 5 minutos

export const buscarComCache = async (chave, funcaoBusca) => {
  const agora = Date.now();
  const itemCache = cache.get(chave);
  
  // Verificar se existe cache válido
  if (itemCache && (agora - itemCache.timestamp) < tempoCache) {
    console.log(`Usando dados do cache para: ${chave}`);
    return itemCache.dados;
  }
  
  // Buscar dados frescos
  console.log(`Buscando dados frescos para: ${chave}`);
  const dados = await funcaoBusca();
  
  // Salvar no cache
  cache.set(chave, {
    dados,
    timestamp: agora
  });
  
  return dados;
};

// Limpar cache
export const limparCache = () => {
  cache.clear();
  console.log('Cache limpo');
};

// Obter estatísticas do cache
export const obterEstatisticasCache = () => {
  return {
    tamanho: cache.size,
    chaves: Array.from(cache.keys())
  };
};
