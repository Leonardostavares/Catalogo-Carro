import React, { useState, useEffect } from 'react';
import CarCard from '../CarCard/CarCard';
import EditCarModal from '../EditCarModal/EditCarModal';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';
import Notification from '../Notification/Notification';
import { obterCarrosDoBackend } from '../../services/api';
import useNotification from '../../hooks/useNotification';
import './CarList.css';

const CarList = ({ cars: carrosExternos, onCarsUpdate, recarregar, onRecarregarComplete, novoCarroParaAdicionar, onNovoCarroAdicionado }) => {
  const [carros, setCarros] = useState([]);
  const [carrosPorMarca, setCarrosPorMarca] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [carroEmEdicao, setCarroEmEdicao] = useState(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [carroParaExcluir, setCarroParaExcluir] = useState(null);
  const { notification, showSuccess, showError, hideNotification } = useNotification();

  // Usar apenas os carros do estado interno (que vêm do backend + APIs externas)
  const todosCarros = carros;

  // Função para editar carro
  const handleEditCar = (car) => {
    console.log('Editando carro:', car);
    setCarroEmEdicao(car);
    setModalEditOpen(true);
  };

  // Função para excluir carro
  const handleDeleteCar = (car) => {
    console.log('Excluindo carro:', car);
    setCarroParaExcluir(car);
    setModalDeleteOpen(true);
  };

  // Função para salvar edição
  const handleSaveEdit = async (idCarro, dadosAtualizados) => {
    try {
      console.log('Salvando edição do carro:', idCarro, dadosAtualizados);
      
      // Importar a função da API
      const { atualizarCarro } = await import('../../services/api');
      
      // Chamar a API para atualizar
      const resultado = await atualizarCarro(idCarro, dadosAtualizados);
      
      console.log('Carro atualizado com sucesso:', resultado);
      
      // Fechar modal
      setModalEditOpen(false);
      setCarroEmEdicao(null);
      
      // Atualizar apenas o carro específico no estado local
      setCarros(carrosAtuais => {
        return carrosAtuais.map(carro => {
          if (carro.id === idCarro) {
            // Atualizar o carro com os novos dados
            return {
              ...carro,
              nome_modelo: dadosAtualizados.nome_modelo,
              ano: dadosAtualizados.ano,
              combustivel: dadosAtualizados.combustivel,
              num_portas: dadosAtualizados.numPortas,
              cor: dadosAtualizados.cor,
              valor: dadosAtualizados.valor
            };
          }
          return carro;
        });
      });
      
      showSuccess('Carro atualizado com sucesso!');
    } catch (erro) {
      console.error('Erro ao atualizar carro:', erro);
      showError(`Erro ao atualizar carro: ${erro.message}`);
    }
  };

  // Função para confirmar exclusão
  const handleConfirmDelete = async (idCarro) => {
    try {
      console.log('Confirmando exclusão do carro:', idCarro);
      
      // Verificar se o ID é válido
      if (!idCarro || idCarro === 'sem_id') {
        showError('Não é possível excluir carros das APIs externas. Apenas carros cadastrados podem ser excluídos.');
        setModalDeleteOpen(false);
        setCarroParaExcluir(null);
        return;
      }
      
      // Importar a função da API
      const { deletarCarro } = await import('../../services/api');
      
      // Chamar a API para deletar
      const resultado = await deletarCarro(idCarro);
      
      console.log('Carro deletado com sucesso:', resultado);
      
      // Fechar modal
      setModalDeleteOpen(false);
      setCarroParaExcluir(null);
      
      // Remover apenas o carro específico do estado local
      setCarros(carrosAtuais => {
        return carrosAtuais.filter(carro => carro.id !== idCarro);
      });
      
      showSuccess('Carro excluído com sucesso!');
    } catch (erro) {
      console.error('Erro ao deletar carro:', erro);
      showError(`Erro ao deletar carro: ${erro.message}`);
    }
  };

  useEffect(() => {
    buscarCarros();
  }, []);

  // Recarregar quando solicitado
  useEffect(() => {
    if (recarregar) {
      console.log('🔄 === RECARREGAMENTO SOLICITADO === 🔄');
      console.log('Estado atual dos carros antes do recarregamento:', carros);
      // TEMPORARIAMENTE DESABILITADO PARA EVITAR BAGUNÇA
      // buscarCarros();
      onRecarregarComplete();
    }
  }, [recarregar, onRecarregarComplete]);

  // Adicionar novo carro quando recebido
  useEffect(() => {
    if (novoCarroParaAdicionar) {
      console.log('🆕 === ADICIONANDO NOVO CARRO === 🆕');
      console.log('Novo carro:', novoCarroParaAdicionar);
      
      setCarros(carrosAtuais => {
        // Verificar se o carro já existe (por ID)
        const carroExiste = carrosAtuais.some(carro => carro.id === novoCarroParaAdicionar.id);
        
        if (carroExiste) {
          console.log('Carro já existe, não adicionando novamente');
          return carrosAtuais;
        }
        
        console.log('Adicionando novo carro ao estado');
        return [...carrosAtuais, novoCarroParaAdicionar];
      });
      
      // Notificar que o carro foi adicionado
      onNovoCarroAdicionado();
    }
  }, [novoCarroParaAdicionar, onNovoCarroAdicionado]);

  const buscarCarros = async () => {
    try {
      setCarregando(true);
      setErro(null);

      console.log('🚗 === INICIANDO BUSCA DE CARROS === 🚗');
      
      // Buscar carros do backend PRIMEIRO (prioridade)
      console.log('1. Buscando carros do backend...');
      let carrosDoBackend = [];
      try {
        carrosDoBackend = await obterCarrosDoBackend();
        console.log(`   ✅ Carros do backend obtidos: ${carrosDoBackend.length}`);
        console.log('   Dados do backend:', carrosDoBackend);
      } catch (erroBackend) {
        console.log('   ❌ Erro ao buscar do backend (pode estar offline):', erroBackend);
        // Continuar mesmo se o backend falhar
      }
      
      // Converter dados do backend para o formato esperado pelo frontend
      console.log('2. Convertendo dados do backend...');
      const carrosBackendConvertidos = carrosDoBackend.map(carro => {
        const carroConvertido = {
          id: carro.id,
          nome_modelo: carro.nomeModelo,
          marca: carro.nomeMarca,
          ano: carro.ano,
          combustivel: carro.combustivel,
          num_portas: carro.numPortas,
          cor: carro.cor,
          valor: carro.valor,
          timestamp_cadastro: carro.timestampCadastro,
          origem: 'backend' // Marcar origem para evitar duplicação
        };
        console.log(`   Convertido: ID=${carroConvertido.id}, Modelo=${carroConvertido.nome_modelo}, Marca=${carroConvertido.marca}`);
        return carroConvertido;
      });
      console.log(`   ✅ Carros convertidos: ${carrosBackendConvertidos.length}`);

      // Buscar carros das APIs externas (apenas se não houver conflito)
      console.log('3. Buscando carros das APIs externas...');
      const carrosExternos = await buscarCarrosExternos();
      console.log(`   ✅ Carros externos obtidos: ${carrosExternos.length}`);
      
      // Log detalhado dos carros externos
      carrosExternos.forEach((carro, index) => {
        console.log(`   Externo ${index + 1}: ID=${carro.id}, Modelo=${carro.nome_modelo}, Marca=${carro.marca || carro.brand}`);
      });
      
      // Filtrar carros externos que NÃO conflitam com carros do backend
      console.log('4. Filtrando carros externos sem conflito...');
      const idsBackend = new Set(carrosBackendConvertidos.map(c => c.id));
      console.log('   IDs do backend:', Array.from(idsBackend));
      
      const carrosExternosFiltrados = carrosExternos.filter(carro => {
        const temConflito = idsBackend.has(carro.id);
        console.log(`   Carro externo ID=${carro.id}: ${temConflito ? 'CONFLITO - REMOVIDO' : 'OK - MANTIDO'}`);
        return !temConflito;
      });
      console.log(`   ✅ Carros externos sem conflito: ${carrosExternosFiltrados.length}`);

      // Combinar carros do backend (prioridade) + carros externos filtrados
      console.log('5. Combinando dados...');
      const todosCarros = [...carrosBackendConvertidos, ...carrosExternosFiltrados];
      console.log(`   Total final: ${todosCarros.length}`);
      
      // Log detalhado do resultado final
      console.log('=== RESULTADO FINAL ===');
      todosCarros.forEach((carro, index) => {
        console.log(`   Final ${index + 1}: ID=${carro.id}, Modelo=${carro.nome_modelo}, Marca=${carro.marca}, Origem=${carro.origem}`);
      });
      console.log('=======================');

      setCarros(todosCarros);
      setCarrosPorMarca({});
      
      console.log('🚗 === BUSCA DE CARROS CONCLUÍDA === 🚗');
      console.log('Estado dos carros após setCarros:', todosCarros);
      
    } catch (err) {
      console.error('❌ Erro ao buscar carros:', err);
      setErro('Erro ao carregar dados dos carros');
      
      // Fallback: usar dados vazios se a API falhar
      setCarros([]);
      setCarrosPorMarca({});
    } finally {
      setCarregando(false);
    }
  };

  // Função para buscar carros das APIs externas (parte do teste)
  const buscarCarrosExternos = async () => {
    try {
      console.log('=== USANDO DADOS MOCKADOS DAS APIs EXTERNAS ===');
      
      // Dados mockados baseados nos JSONs fornecidos
      const dadosCarros = {
        cars: [
          {
            id: 55,
            timestamp_cadastro: 1696549488,
            modelo_id: 88,
            ano: 2014,
            combustivel: "FLEX",
            num_portas: 4,
            cor: "BRANCA",
            nome_modelo: "ETIOS",
            valor: 36.000,
            brand: 1
          },
          {
            id: 23,
            timestamp_cadastro: 1696531236,
            modelo_id: 77,
            ano: 2014,
            combustivel: "FLEX",
            num_portas: 4,
            cor: "PRETO",
            nome_modelo: "COROLLA",
            valor: 120.000,
            brand: 1
          },
          {
            id: 3,
            timestamp_cadastro: 16965354321,
            modelo_id: 79,
            ano: 1993,
            combustivel: "DIESEL",
            num_portas: 4,
            cor: "AZUL",
            nome_modelo: "HILLUX SW4",
            valor: 47.500,
            brand: 1
          }
        ]
      };

      const dadosCarrosPorMarca = {
        cars: [
          {
            id: 1,
            timestamp_cadastro: 1696539488,
            modelo_id: 12,
            ano: 2015,
            combustivel: "FLEX",
            num_portas: 4,
            cor: "BEGE",
            nome_modelo: "ONIX PLUS",
            valor: 50
          },
          {
            id: 2,
            timestamp_cadastro: 1696531234,
            modelo_id: 14,
            ano: 2014,
            combustivel: "FLEX",
            num_portas: 4,
            cor: "AZUL",
            nome_modelo: "JETTA",
            valor: 49
          },
          {
            id: 3,
            timestamp_cadastro: 16965354321,
            modelo_id: 79,
            ano: 1993,
            combustivel: "DIESEL",
            num_portas: 4,
            cor: "AZUL",
            nome_modelo: "HILLUX SW4",
            valor: 47.5
          }
        ]
      };

      // Combinar dados dos dois endpoints externos
      let carrosExternos = [...(dadosCarros.cars || []), ...(dadosCarrosPorMarca.cars || [])];
      
      console.log('=== DADOS BRUTOS DAS APIs ===');
      console.log('Primeira API (cars.json):', dadosCarros.cars || []);
      console.log('Segunda API (cars_by_brand.json):', dadosCarrosPorMarca.cars || []);
      console.log('Total combinado:', carrosExternos.length);
      
      // Processar carros externos: tratar IDs ausentes (valores serão multiplicados no CarCard)
      const carrosExternosProcessados = carrosExternos.map((carro, index) => {
        // Tratar carros sem ID
        const idProcessado = carro.id || `sem_id_${index}_${Date.now()}`;
        
        return {
          ...carro,
          id: idProcessado,
          origem: 'api_externa'
        };
      });
      
      // Remover duplicatas baseado em nome_modelo + ano + cor + combustivel (carros idênticos)
      const carrosUnicos = [];
      const chavesVistas = new Set();
      
      carrosExternosProcessados.forEach(carro => {
        // Chave única baseada em características do carro (sem ID para remover duplicatas reais)
        const chaveUnica = `${carro.nome_modelo}_${carro.ano}_${carro.cor}_${carro.combustivel}_${carro.num_portas}`;
        
        if (!chavesVistas.has(chaveUnica)) {
          carrosUnicos.push(carro);
          chavesVistas.add(chaveUnica);
          console.log(`✅ Mantido: ${carro.nome_modelo} ${carro.ano} ${carro.cor} (ID: ${carro.id || 'sem ID'}) - Brand: ${carro.brand}`);
        } else {
          console.log(`❌ Removido duplicado: ${carro.nome_modelo} ${carro.ano} ${carro.cor} (ID: ${carro.id || 'sem ID'}) - Brand: ${carro.brand}`);
        }
      });
      
      console.log('Carros processados das APIs externas:', carrosUnicos.length);
      console.log('Carros finais:', carrosUnicos);
      
      return carrosUnicos;
      
    } catch (err) {
      console.error('Erro ao buscar carros externos:', err);
      return []; // Retornar array vazio se falhar
    }
  };



  const agruparCarrosPorMarca = () => {
    const agrupados = {};
    
    console.log('=== INICIANDO AGRUPAMENTO ===');
    console.log('Total de carros para agrupar:', todosCarros.length);
    
    todosCarros.forEach((carro, index) => {
      // Mapeamento de brand numérico para nome da marca
      const mapaMarcas = {
        1: 'Toyota',
        2: 'Chevrolet', 
        3: 'Volkswagen',
        4: 'Ford',
        5: 'Honda',
        6: 'Fiat',
        7: 'Hyundai',
        8: 'BMW',
        9: 'Mercedes-Benz',
        10: 'Audi'
      };
      
      let marca = 'Outros';
      
      // Debug: log do carro para entender a estrutura
      console.log(`Carro ${index + 1}:`, {
        nome_modelo: carro.nome_modelo,
        marca: carro.marca,
        brand: carro.brand,
        origem: carro.origem
      });
      
      // Prioridade 1: Verificar brand primeiro (APIs externas)
      if (carro.brand !== undefined && carro.brand !== null) {
        marca = mapaMarcas[carro.brand] || `Marca ${carro.brand}`;
        console.log(`   → Usando brand ${carro.brand}: ${marca}`);
        
        // Verificação especial para Toyota (brand: 1)
        if (carro.brand === 1) {
          marca = 'Toyota';
          console.log(`   → Confirmado Toyota por brand: ${carro.brand}`);
        }
      }
      // Prioridade 2: Usar campo marca se disponível (carros do formulário/backend)
      else if (carro.marca && carro.marca.trim() !== '') {
        marca = carro.marca;
        console.log(`   → Usando marca direta: ${marca}`);
      }
      // Prioridade 3: Inferir marca a partir do nome do modelo
      else if (carro.nome_modelo) {
        const nomeModelo = carro.nome_modelo.toLowerCase();
        
        if (nomeModelo.includes('onix')) {
          marca = 'Chevrolet';
        } else if (nomeModelo.includes('jetta') || nomeModelo.includes('golf') || nomeModelo.includes('polo') || nomeModelo.includes('passat') || nomeModelo.includes('tiguan') || nomeModelo.includes('touareg')) {
          marca = 'Volkswagen';
        } else if (nomeModelo.includes('hilux') || nomeModelo.includes('etios') || nomeModelo.includes('corolla') || nomeModelo.includes('camry') || nomeModelo.includes('rav4')) {
          marca = 'Toyota';
        } else if (nomeModelo.includes('ford') || nomeModelo.includes('focus') || nomeModelo.includes('fiesta') || nomeModelo.includes('ranger')) {
          marca = 'Ford';
        } else if (nomeModelo.includes('honda') || nomeModelo.includes('civic') || nomeModelo.includes('fit') || nomeModelo.includes('cr-v')) {
          marca = 'Honda';
        } else if (nomeModelo.includes('fiat') || nomeModelo.includes('palio') || nomeModelo.includes('uno') || nomeModelo.includes('punto')) {
          marca = 'Fiat';
        } else if (nomeModelo.includes('hyundai') || nomeModelo.includes('hb20') || nomeModelo.includes('i30') || nomeModelo.includes('tucson')) {
          marca = 'Hyundai';
        } else if (nomeModelo.includes('bmw') || nomeModelo.includes('x1') || nomeModelo.includes('x3') || nomeModelo.includes('x5')) {
          marca = 'BMW';
        } else if (nomeModelo.includes('mercedes') || nomeModelo.includes('classe') || nomeModelo.includes('classe a') || nomeModelo.includes('classe c')) {
          marca = 'Mercedes-Benz';
        } else if (nomeModelo.includes('audi') || nomeModelo.includes('a3') || nomeModelo.includes('a4') || nomeModelo.includes('q3')) {
          marca = 'Audi';
        }
        console.log(`   → Inferindo marca por modelo: ${marca}`);
      }
      
      // Log final da marca atribuída
      console.log(`   → MARCA FINAL: ${marca} para ${carro.nome_modelo}`);
      
      if (!agrupados[marca]) {
        agrupados[marca] = [];
      }
      agrupados[marca].push(carro);
      console.log(`   → Adicionado à marca: ${marca}`);
    });

    console.log('=== RESULTADO FINAL DO AGRUPAMENTO ===');
    Object.keys(agrupados).forEach(marca => {
      const carrosNaMarca = agrupados[marca];
      console.log(`${marca}: ${carrosNaMarca.length} carros`);
    });
    
    return agrupados;
  };

  if (carregando) {
    return (
      <div className="car-list">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando catálogo de carros...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="car-list">
        <div className="error-container">
          <h2>❌ Erro ao carregar dados</h2>
          <p>{erro}</p>
          <button onClick={buscarCarros} className="retry-btn">
            🔄 Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const carrosAgrupados = agruparCarrosPorMarca();
  const marcas = Object.keys(carrosAgrupados).sort();
  
  // Log para debug
  console.log('🔍 === RENDERIZAÇÃO FINAL === 🔍');
  console.log('Total de carros no estado:', carros.length);
  console.log('Total de carros agrupados:', Object.values(carrosAgrupados).flat().length);
  console.log('Marcas encontradas:', marcas);
  marcas.forEach(marca => {
    console.log(`${marca}: ${carrosAgrupados[marca].length} carros`);
  });
  console.log('🔍 ========================= 🔍');

  if (marcas.length === 0) {
    return (
      <div className="car-list">
        <div className="empty-container">
          <h2>🚗 Nenhum carro encontrado</h2>
          <p>Não foi possível carregar dados dos carros.</p>
          <button onClick={buscarCarros} className="retry-btn">
            🔄 Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="car-list">
      <div className="car-list-header">
        <h2>🚗 Catálogo de Carros</h2>
        <p>Total de carros: {todosCarros.length}</p>
      </div>
      
      {marcas.map(marca => (
        <div key={marca} className="brand-section">
          <h3 className="brand-title">{marca}</h3>
          <div className="cars-grid">
            {carrosAgrupados[marca].map((carro, index) => {
              // Criar chave única baseada em múltiplos campos
              const chaveUnica = `${carro.id || 'sem_id'}-${carro.origem || 'sem_origem'}-${carro.nome_modelo || 'sem_modelo'}-${carro.marca || carro.brand || 'sem_marca'}-${marca}-${index}`;
              return (
                <CarCard 
                  key={chaveUnica} 
                  car={carro} 
                  onEdit={handleEditCar}
                  onDelete={handleDeleteCar}
                />
              );
            })}
          </div>
        </div>
      ))}
      
      {/* Modal de Edição */}
      <EditCarModal
        car={carroEmEdicao}
        isOpen={modalEditOpen}
        onClose={() => {
          setModalEditOpen(false);
          setCarroEmEdicao(null);
        }}
        onSave={handleSaveEdit}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        car={carroParaExcluir}
        isOpen={modalDeleteOpen}
        onClose={() => {
          setModalDeleteOpen(false);
          setCarroParaExcluir(null);
        }}
        onConfirm={handleConfirmDelete}
      />
      
      {/* Componente de Notificação */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        duration={notification.duration}
      />
    </div>
  );
};

export default CarList;
