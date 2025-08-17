# 📋 Componente CarList - Documentação de Uso

## 🎯 Descrição
O componente `CarList` é responsável por exibir uma listagem de carros agrupados por marca, com funcionalidades de edição e exclusão. Ele consome dados de APIs externas e do backend local, combinando-os de forma inteligente.

## 📦 Props Disponíveis

### **Props Obrigatórias**

| Prop | Tipo | Descrição | Exemplo |
|------|------|-----------|---------|
| `cars` | `Array` | Array de carros externos (não obrigatório, pode ser vazio) | `[]` |

### **Props Opcionais**

| Prop | Tipo | Descrição | Padrão | Exemplo |
|------|------|-----------|--------|---------|
| `onCarsUpdate` | `Function` | Callback executado quando a lista de carros é atualizada | `() => {}` | `(carros) => console.log(carros)` |
| `recarregar` | `Boolean` | Flag para forçar recarregamento da lista | `false` | `true` |
| `onRecarregarComplete` | `Function` | Callback executado após recarregamento | `() => {}` | `() => setRecarregando(false)` |
| `novoCarroParaAdicionar` | `Object` | Objeto do novo carro a ser adicionado à lista | `null` | `{id: 1001, nome_modelo: "Civic", ...}` |
| `onNovoCarroAdicionado` | `Function` | Callback executado após adicionar novo carro | `() => {}` | `() => setNovoCarro(null)` |

## 🚀 Como Usar

### **Uso Básico**
```jsx
import CarList from './components/CarList/CarList';

function App() {
  return (
    <CarList 
      cars={[]} 
    />
  );
}
```

### **Uso Completo com Callbacks**
```jsx
import CarList from './components/CarList/CarList';

function App() {
  const [recarregar, setRecarregar] = useState(false);
  const [novoCarro, setNovoCarro] = useState(null);

  const handleCarsUpdate = (carros) => {
    console.log('Lista de carros atualizada:', carros);
  };

  const handleRecarregarComplete = () => {
    setRecarregar(false);
  };

  const handleNovoCarroAdicionado = () => {
    setNovoCarro(null);
  };

  return (
    <CarList 
      cars={[]}
      onCarsUpdate={handleCarsUpdate}
      recarregar={recarregar}
      onRecarregarComplete={handleRecarregarComplete}
      novoCarroParaAdicionar={novoCarro}
      onNovoCarroAdicionado={handleNovoCarroAdicionado}
    />
  );
}
```

## 🔧 Funcionalidades Internas

### **Consumo de Dados**
- **APIs Externas**: Consome automaticamente `cars.json` e `cars_by_brand.json`
- **Backend Local**: Integra com API REST do Spring Boot
- **Combinação Inteligente**: Prioriza dados do backend e remove duplicatas

### **Agrupamento**
- **Por Marca**: Carros organizados em seções por marca
- **Diferenciação Visual**: Carros locais (azul) vs externos (amarelo)
- **Ordenação**: Marcas em ordem alfabética

### **Interações**
- **Edição**: Modal para editar carros locais
- **Exclusão**: Modal de confirmação para excluir carros locais
- **Notificações**: Sistema de notificações estilizadas

## 📊 Estrutura de Dados

### **Formato do Carro**
```javascript
{
  id: Number,                    // ID único do carro
  nome_modelo: String,           // Nome do modelo
  marca: String,                 // Nome da marca
  ano: Number,                   // Ano do carro
  combustivel: String,           // Tipo de combustível
  num_portas: Number,            // Número de portas
  cor: String,                   // Cor do carro
  valor: Number,                 // Valor do carro
  timestamp_cadastro: Number,    // Timestamp de cadastro
  origem: String                 // 'backend' ou 'api_externa'
}
```

## 🎨 Estilos CSS

O componente usa as seguintes classes CSS:
- `.car-list` - Container principal
- `.brand-section` - Seção de cada marca
- `.brand-title` - Título da marca
- `.cars-grid` - Grid de cards de carros

## 🔍 Estados do Componente

### **Estados Internos**
- `carros` - Lista de todos os carros
- `carregando` - Estado de carregamento
- `erro` - Estado de erro
- `modalEditOpen` - Modal de edição aberto/fechado
- `modalDeleteOpen` - Modal de exclusão aberto/fechado

### **Estados Visuais**
- **Carregando**: Spinner com mensagem
- **Erro**: Mensagem de erro com botão de retry
- **Vazio**: Mensagem quando não há carros
- **Sucesso**: Lista de carros agrupados

## 🛠️ Dependências

### **Componentes Internos**
- `CarCard` - Card individual de cada carro
- `EditCarModal` - Modal de edição
- `DeleteConfirmModal` - Modal de confirmação de exclusão
- `Notification` - Sistema de notificações

### **Hooks**
- `useNotification` - Gerenciamento de notificações

### **APIs**
- `obterCarrosDoBackend` - Busca carros do backend
- APIs externas da WSWork

## 📝 Exemplo de Implementação Completa

```jsx
import React, { useState } from 'react';
import CarList from './components/CarList/CarList';

function CatalogoCarros() {
  const [recarregar, setRecarregar] = useState(false);
  const [novoCarro, setNovoCarro] = useState(null);

  const handleAdicionarCarro = (carro) => {
    setNovoCarro(carro);
  };

  const handleRecarregar = () => {
    setRecarregar(true);
  };

  return (
    <div>
      <h1>Catálogo de Carros</h1>
      
      <button onClick={handleRecarregar}>
        Recarregar Lista
      </button>
      
      <CarList 
        cars={[]}
        recarregar={recarregar}
        onRecarregarComplete={() => setRecarregar(false)}
        novoCarroParaAdicionar={novoCarro}
        onNovoCarroAdicionado={() => setNovoCarro(null)}
        onCarsUpdate={(carros) => {
          console.log(`Total de carros: ${carros.length}`);
        }}
      />
    </div>
  );
}

export default CatalogoCarros;
```

## ✅ Checklist de Implementação

- [x] Props bem definidas e documentadas
- [x] Exemplo de uso básico
- [x] Exemplo de uso completo
- [x] Documentação de funcionalidades
- [x] Estrutura de dados explicada
- [x] Estados do componente
- [x] Dependências listadas
- [x] Exemplo de implementação completa

---

**Versão:** 1.0.0  
**Autor:** Sistema de Catálogo de Carros  
**Data:** 2025
