// Formatação de preços em Real brasileiro
export const formatPrice = (price) => {
  if (!price && price !== 0) return 'Preço não informado';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

// Formatação de preços sem símbolo da moeda
export const formatPriceNumber = (price) => {
  if (!price && price !== 0) return '0,00';
  
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

// Formatação de datas a partir de timestamp Unix
export const formatDate = (timestamp) => {
  if (!timestamp) return 'Data não informada';
  
  try {
    const date = new Date(timestamp * 1000); // Converte de Unix timestamp
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
};

// Formatação de data e hora completa
export const formatDateTime = (timestamp) => {
  if (!timestamp) return 'Data não informada';
  
  try {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Erro ao formatar data/hora:', error);
    return 'Data inválida';
  }
};

// Formatação de combustível
export const formatFuel = (fuel) => {
  if (!fuel) return 'Não informado';
  
  const fuelMap = {
    'FLEX': 'Flex',
    'GASOLINA': 'Gasolina',
    'DIESEL': 'Diesel',
    'ELETRICO': 'Elétrico',
    'HIBRIDO': 'Híbrido',
    'ETANOL': 'Etanol',
    'GNV': 'GNV'
  };
  
  return fuelMap[fuel.toUpperCase()] || fuel;
};

// Formatação de cor
export const formatColor = (color) => {
  if (!color) return 'Não informada';
  
  // Capitaliza primeira letra e converte resto para minúsculas
  return color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
};

// Formatação de número de portas
export const formatDoors = (doors) => {
  if (!doors) return 'Não informado';
  
  const doorNumber = parseInt(doors);
  if (isNaN(doorNumber)) return doors;
  
  return `${doorNumber} porta${doorNumber > 1 ? 's' : ''}`;
};

// Formatação de ano
export const formatYear = (year) => {
  if (!year) return 'Ano não informado';
  
  const yearNumber = parseInt(year);
  if (isNaN(yearNumber)) return year;
  
  return yearNumber.toString();
};

// Formatação de marca
export const formatBrand = (brand) => {
  if (!brand) return 'Marca não informada';
  
  // Capitaliza primeira letra de cada palavra
  return brand.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Formatação de modelo
export const formatModel = (model) => {
  if (!model) return 'Modelo não informado';
  
  // Mantém algumas palavras em maiúsculas (siglas)
  const upperWords = ['SUV', 'GT', 'RS', 'AMG', 'M', 'S', 'X', 'Y'];
  
  return model.split(' ')
    .map(word => {
      const upperWord = word.toUpperCase();
      if (upperWords.includes(upperWord)) {
        return upperWord;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

// Formatação de ID
export const formatId = (id) => {
  if (!id && id !== 0) return 'N/I';
  return id.toString();
};

// Formatação de texto com limite de caracteres
export const formatText = (text, maxLength = 50) => {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
};

// Formatação de número de telefone
export const formatPhone = (phone) => {
  if (!phone) return '';
  
  // Remove tudo que não é número
  const numbers = phone.replace(/\D/g, '');
  
  if (numbers.length === 11) {
    return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7)}`;
  }
  
  if (numbers.length === 10) {
    return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 6)}-${numbers.substring(6)}`;
  }
  
  return phone;
};

// Formatação de CPF
export const formatCPF = (cpf) => {
  if (!cpf) return '';
  
  // Remove tudo que não é número
  const numbers = cpf.replace(/\D/g, '');
  
  if (numbers.length === 11) {
    return `${numbers.substring(0, 3)}.${numbers.substring(3, 6)}.${numbers.substring(6, 9)}-${numbers.substring(9)}`;
  }
  
  return cpf;
};

// Formatação de CEP
export const formatCEP = (cep) => {
  if (!cep) return '';
  
  // Remove tudo que não é número
  const numbers = cep.replace(/\D/g, '');
  
  if (numbers.length === 8) {
    return `${numbers.substring(0, 5)}-${numbers.substring(5)}`;
  }
  
  return cep;
};

// Função para capitalizar primeira letra
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Função para capitalizar todas as palavras
export const capitalizeWords = (text) => {
  if (!text) return '';
  
  return text.split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

// Função para formatar bytes em formato legível
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Exportar todas as funções como um objeto para uso alternativo
export const formatters = {
  formatPrice,
  formatPriceNumber,
  formatDate,
  formatDateTime,
  formatFuel,
  formatColor,
  formatDoors,
  formatYear,
  formatBrand,
  formatModel,
  formatId,
  formatText,
  formatPhone,
  formatCPF,
  formatCEP,
  capitalize,
  capitalizeWords,
  formatBytes
};
