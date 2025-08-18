# 🚗 CarList Component

Componente React reutilizável para exibição de listas de carros com funcionalidades de edição e exclusão.

## 📋 Visão Geral

O componente `CarList` é um componente React reutilizável que exibe uma lista de carros com funcionalidades completas de gerenciamento. Ele foi projetado para ser flexível e pode ser usado em diferentes contextos da aplicação.

## 🎯 Funcionalidades

- **Listagem de Carros** - Exibe carros em formato de cards
- **Edição Inline** - Modal para editar carros
- **Exclusão com Confirmação** - Modal de confirmação para deletar
- **Responsivo** - Adapta-se a diferentes tamanhos de tela
- **Reutilizável** - Pode ser usado em múltiplas páginas
- **Customizável** - Props para personalizar comportamento

## 📁 Estrutura do Componente

```
src/components/CarList/
├── CarList.jsx          # Componente principal
├── CarList.css          # Estilos do componente
└── README.md           # Esta documentação
```

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **CSS3** - Estilização moderna
- **JavaScript ES6+** - Funcionalidades avançadas
- **Props** - Comunicação com componente pai

## 🔧 Props do Componente

### Props Obrigatórias
```javascript
{
  cars: Array,           // Array de carros para exibir
  onEdit: Function,      // Função chamada ao editar carro
  onDelete: Function     // Função chamada ao deletar carro
}
```

### Props Opcionais
```javascript
{
  title: String,         // Título da lista (padrão: "Carros")
  emptyMessage: String,  // Mensagem quando não há carros
  showActions: Boolean,  // Mostrar botões de ação (padrão: true)
  className: String      // Classes CSS adicionais
}
```

## 📖 Exemplo de Uso

### Uso Básico
```jsx
import CarList from './components/CarList/CarList';

function HomePage() {
  const cars = [
    {
      id: 1,
      nome_modelo: "Corolla",
      marca: "Toyota",
      ano: 2020,
      valor: 120000
    }
  ];

  const handleEdit = (car) => {
    console.log('Editar carro:', car);
  };

  const handleDelete = (car) => {
    console.log('Deletar carro:', car);
  };

  return (
    <CarList
      cars={cars}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
```

### Uso com Props Personalizadas
```jsx
<CarList
  cars={filteredCars}
  title="Carros Encontrados"
  emptyMessage="Nenhum carro encontrado na busca"
  onEdit={handleEdit}
  onDelete={handleDelete}
  showActions={true}
  className="custom-car-list"
/>
```

## 🎨 Estilos e Customização

### Classes CSS Disponíveis
```css
.car-list-container     /* Container principal */
.car-list-title        /* Título da lista */
.car-list-grid         /* Grid de carros */
.car-list-empty        /* Mensagem de lista vazia */
.car-list-card         /* Card individual do carro */
.car-list-actions      /* Botões de ação */
```

### Customização com CSS
```css
/* Exemplo de customização */
.custom-car-list .car-list-grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.custom-car-list .car-list-card {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
```

## 📊 Formato dos Dados

### Estrutura do Carro
```javascript
{
  id: number,                    // ID único do carro
  nome_modelo: string,           // Nome do modelo
  marca: string,                 // Nome da marca
  ano: number,                   // Ano do carro
  combustivel: string,           // Tipo de combustível
  num_portas: number,            // Número de portas
  cor: string,                   // Cor do carro
  valor: number,                 // Valor do carro
  timestamp_cadastro: number,    // Timestamp de cadastro
  origem: 'backend' | 'api_externa' // Origem dos dados
}
```

### Exemplo de Dados
```javascript
const carExample = {
  id: 1,
  nome_modelo: "Corolla",
  marca: "Toyota",
  ano: 2020,
  combustivel: "FLEX",
  num_portas: 4,
  cor: "PRETO",
  valor: 120000,
  timestamp_cadastro: 1642234567,
  origem: "backend"
};
```

## 🔄 Estados do Componente

### Estados Internos
```javascript
{
  selectedCar: Object | null,    // Carro selecionado para edição
  showEditModal: Boolean,        // Controla modal de edição
  showDeleteModal: Boolean,      // Controla modal de exclusão
  loading: Boolean               // Estado de carregamento
}
```

### Fluxo de Estados
1. **Inicial** - Lista carregada, sem ações
2. **Edição** - Modal de edição aberto
3. **Exclusão** - Modal de confirmação aberto
4. **Carregando** - Operação em andamento

## 🎯 Casos de Uso

### 1. Lista Principal de Carros
```jsx
// Página inicial com todos os carros
<CarList
  cars={allCars}
  title="Catálogo de Carros"
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### 2. Resultados de Busca
```jsx
// Resultados filtrados da busca
<CarList
  cars={searchResults}
  title="Resultados da Busca"
  emptyMessage="Nenhum carro encontrado"
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### 3. Carros por Marca
```jsx
// Carros de uma marca específica
<CarList
  cars={brandCars}
  title={`Carros ${selectedBrand.name}`}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

## 🔧 Integração com Outros Componentes

### Com EditCarModal
```jsx
<CarList
  cars={cars}
  onEdit={(car) => setCarToEdit(car)}
  onDelete={handleDelete}
/>

{carToEdit && (
  <EditCarModal
    car={carToEdit}
    onSave={handleSave}
    onClose={() => setCarToEdit(null)}
  />
)}
```

### Com DeleteConfirmModal
```jsx
<CarList
  cars={cars}
  onEdit={handleEdit}
  onDelete={(car) => setCarToDelete(car)}
/>

{carToDelete && (
  <DeleteConfirmModal
    car={carToDelete}
    onConfirm={handleConfirmDelete}
    onClose={() => setCarToDelete(null)}
  />
)}
```

## 🧪 Testes

### Testes Unitários
```javascript
// Exemplo de teste
describe('CarList Component', () => {
  it('should render cars correctly', () => {
    const cars = [mockCar];
    render(<CarList cars={cars} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText('Corolla')).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<CarList cars={[mockCar]} onEdit={onEdit} onDelete={jest.fn()} />);
    fireEvent.click(screen.getByText('Editar'));
    expect(onEdit).toHaveBeenCalledWith(mockCar);
  });
});
```

## 🚀 Performance

### Otimizações Implementadas
- **React.memo** - Evita re-renders desnecessários
- **useCallback** - Memoização de funções
- **Virtualização** - Para listas grandes (futuro)
- **Lazy Loading** - Carregamento sob demanda

### Boas Práticas
- Props tipadas com PropTypes
- Tratamento de erros
- Estados de loading
- Acessibilidade (ARIA labels)

## 🔄 Versões e Changelog

### v1.0.0
- ✅ Listagem básica de carros
- ✅ Funcionalidades de edição e exclusão
- ✅ Design responsivo
- ✅ Props customizáveis

### v1.1.0 (Planejado)
- 🔄 Virtualização para listas grandes
- 🔄 Drag and drop para reordenação
- 🔄 Filtros inline
- 🔄 Exportação de dados

## 🤝 Contribuição

Para contribuir com o componente:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Implemente as mudanças
4. Adicione testes
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou sugestões sobre o componente:
- Abra uma issue no repositório
- Consulte a documentação da aplicação principal
- Verifique os exemplos de uso

---

**Componente desenvolvido para o Catálogo de Carros**
