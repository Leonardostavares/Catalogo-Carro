/**
 * Processa carros e cria lista de marcas organizadas
 * @param {Array} carros - Array de carros
 * @returns {Array} Array de marcas com seus carros
 */
export const processarCarrosParaMarcas = (carros) => {
  const marcasMap = {};
  
  carros.forEach((carro) => {
    // Determinar a marca baseada nos dados do carro
    let marca = 'Outros';
    
    // Priorizar a marca que já está definida no carro (para carros criados/editados)
    if (carro.marca && carro.marca.trim() !== '') {
      marca = carro.marca.trim();
    } else if (carro.brand === 1) {
      marca = 'Toyota';
    } else if (carro.brand === 2) {
      marca = 'Volkswagen';
    } else if (carro.brand === 3) {
      marca = 'Chevrolet';
    } else if (carro.brand === 4) {
      marca = 'Ford';
    } else if (carro.brand === 5) {
      marca = 'Honda';
    } else if (carro.brand === 6) {
      marca = 'Hyundai';
    } else if (carro.brand === 7) {
      marca = 'Fiat';
    } else if (carro.brand === 8) {
      marca = 'Renault';
    } else if (carro.brand === 9) {
      marca = 'Nissan';
    } else if (carro.brand === 10) {
      marca = 'BMW';
    } else if (carro.brand === 11) {
      marca = 'Mercedes-Benz';
    } else if (carro.brand === 12) {
      marca = 'Audi';
    }
    
    // Adicionar a marca ao carro para exibição
    carro.marca = marca;
    
    if (!marcasMap[marca]) {
      marcasMap[marca] = {
        id: marca.toLowerCase().replace(/\s+/g, '-'),
        name: marca,
        carCount: 0,
        cars: []
      };
    }
    marcasMap[marca].carCount++;
    marcasMap[marca].cars.push(carro);
  });
  
  const marcasProcessadas = Object.values(marcasMap).sort((a, b) => b.carCount - a.carCount);
  
  return marcasProcessadas;
};

/**
 * Filtra carros por marca e modelo
 * @param {Array} carros - Array de carros
 * @param {string} brand - Marca para filtrar
 * @param {string} model - Modelo para filtrar
 * @returns {Array} Array de carros filtrados
 */
export const filtrarCarros = (carros, brand, model) => {
  let filteredCars = carros;
  
  // Filtrar por marca
  if (brand) {
    filteredCars = filteredCars.filter(car => 
      car.marca && car.marca.toLowerCase() === brand.toLowerCase()
    );
  }
  
  // Filtrar por modelo
  if (model) {
    filteredCars = filteredCars.filter(car => 
      car.nome_modelo && 
      car.nome_modelo.toLowerCase().includes(model.toLowerCase())
    );
  }
  
  return filteredCars;
};

/**
 * Valida campos obrigatórios de um carro
 * @param {Object} dadosCarro - Dados do carro
 * @returns {Object} { isValid: boolean, errors: Array }
 */
export const validarCarro = (dadosCarro) => {
  const camposObrigatorios = ['nome_modelo', 'marca', 'ano', 'combustivel', 'num_portas', 'cor', 'valor'];
  const camposVazios = camposObrigatorios.filter(campo => !dadosCarro[campo] || dadosCarro[campo] === '');
  
  return {
    isValid: camposVazios.length === 0,
    errors: camposVazios
  };
};

/**
 * Mapeia dados do carro para o formato do backend
 * @param {Object} dadosCarro - Dados do carro no formato frontend
 * @returns {Object} Dados do carro no formato backend
 */
export const mapearDadosParaBackend = (dadosCarro) => {
  return {
    nomeModelo: dadosCarro.nome_modelo,
    nomeMarca: dadosCarro.marca,
    ano: parseInt(dadosCarro.ano),
    combustivel: dadosCarro.combustivel,
    numPortas: parseInt(dadosCarro.num_portas),
    cor: dadosCarro.cor,
    valor: parseFloat(dadosCarro.valor)
  };
};

/**
 * Mapeia dados do carro do backend para o formato frontend
 * @param {Object} carroBackend - Dados do carro no formato backend
 * @returns {Object} Dados do carro no formato frontend
 */
export const mapearDadosDoBackend = (carroBackend) => {
  return {
    id: carroBackend.id,
    nome_modelo: carroBackend.nomeModelo,
    marca: carroBackend.nomeMarca,
    ano: carroBackend.ano,
    combustivel: carroBackend.combustivel,
    num_portas: carroBackend.numPortas,
    cor: carroBackend.cor,
    valor: carroBackend.valor,
    timestamp_cadastro: carroBackend.timestampCadastro,
    origem: 'backend'
  };
};
