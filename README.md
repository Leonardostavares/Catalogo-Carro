# 🚗 Catálogo de Carros - WS Work

Uma aplicação React moderna para listagem e cadastro de veículos, desenvolvida como teste técnico para a WS Work.

## 📋 Descrição

Este projeto é uma aplicação frontend que consome dados de APIs externas para exibir um catálogo de carros agrupados por marcas, com funcionalidade de cadastro de novos veículos.

## 🌐 **Links da Aplicação**

- **Frontend**: [https://car-catalog-frontend-leonardo-44399dbbc729.herokuapp.com/](https://car-catalog-frontend-leonardo-44399dbbc729.herokuapp.com/)
- **Backend API**: [https://car-catalog-backend-leonardo.herokuapp.com](https://car-catalog-backend-leonardo.herokuapp.com)
- **Dados JSON**: [https://car-catalog-backend-leonardo.herokuapp.com/api/carros](https://car-catalog-backend-leonardo.herokuapp.com/api/carros)
- **API Alternativa**: [https://car-catalog-backend-leonardo.herokuapp.com/carros](https://car-catalog-backend-leonardo.herokuapp.com/carros)

### ✨ Funcionalidades

- 📱 **Interface Responsiva** - Funciona em desktop, tablet e mobile
- 🏷️ **Listagem por Marcas** - Carros organizados por marca
- 🔍 **Busca e Filtros** - Filtros por combustível, cor, ano
- ➕ **Cadastro de Veículos** - Formulário completo para novos carros
- 🎨 **Design Moderno** - Interface elegante com animações
- ⚡ **Performance Otimizada** - Carregamento rápido e eficiente

## 🛠️ Tecnologias Utilizadas

- **React 18.2.0** - Biblioteca principal
- **JavaScript ES6+** - Linguagem de programação
- **CSS3** - Estilização com Grid e Flexbox
- **Fetch API** - Requisições HTTP
- **npm** - Gerenciador de pacotes

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd car-listing-frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm start
   ```

4. **Acesse a aplicação**
   - Abra [http://localhost:3000](http://localhost:3000) no navegador

### Scripts Disponíveis

- `npm start` - Executa o projeto em modo desenvolvimento
- `npm build` - Gera build de produção
- `npm test` - Executa os testes
- `npm eject` - Ejecta a configuração do Create React App

## 🏗️ Estrutura do Projeto

```
frontend/
├── public/
│   └── index.html          # HTML principal
├── src/
│   ├── components/         # Componentes React
│   │   ├── CarList/       # Listagem de carros
│   │   ├── CarCard/       # Card individual
│   │   └── CarForm/       # Formulário de cadastro
│   ├── services/          # Serviços de API
│   │   └── api.js         # Funções de comunicação
│   ├── utils/             # Utilitários
│   │   └── formatters.js  # Funções de formatação
│   ├── App.js             # Componente principal
│   ├── App.css            # Estilos do App
│   ├── index.js           # Ponto de entrada
│   └── index.css          # Estilos globais
└── package.json           # Configurações do projeto
```

## 🧩 Componentes

### CarList (Componente Reutilizável)

O componente principal de listagem de carros, **totalmente reutilizável** e bem documentado.

#### 📖 Documentação de Uso

```jsx
import CarList from './components/CarList/CarList';

// Uso básico
<CarList />

// O componente é auto-suficiente e não requer props
```

#### 🔧 Funcionalidades

- **Busca automática** de dados das APIs
- **Agrupamento por marca** automático
- **Estados de loading** e erro
- **Retry automático** em caso de falha
- **Responsivo** para todos os dispositivos

#### 📊 Estrutura de Dados Esperada

O componente consome dados dos seguintes endpoints:

```json
// https://wswork.com.br/cars.json
{
  "cars": [
    {
      "id": 1,
      "timestamp_cadastro": 1696539488,
      "modelo_id": 12,
      "ano": 2015,
      "combustivel": "FLEX",
      "num_portas": 4,
      "cor": "BEGE",
      "nome_modelo": "ONIX PLUS",
      "valor": 50000,
      "marca": "Chevrolet"
    }
  ]
}
```

```json
// https://wswork.com.br/cars_by_brand.json
{
  "Chevrolet": [
    // Array de carros da marca
  ],
  "Ford": [
    // Array de carros da marca
  ]
}
```

#### 🎨 Customização

O componente pode ser customizado através de CSS:

```css
/* Personalizar seções de marca */
.brand-section {
  background: #f8f9fa;
  border-radius: 10px;
}

/* Personalizar títulos */
.brand-title {
  color: #2c3e50;
  font-size: 1.5rem;
}
```

### CarCard

Componente para exibição individual de cada carro.

```jsx
import CarCard from './components/CarCard/CarCard';

<CarCard car={carData} />
```

**Props:**
- `car` (Object) - Dados do carro

### CarForm

Formulário para cadastro de novos veículos.

```jsx
import CarForm from './components/CarForm/CarForm';

<CarForm 
  onSubmit={handleSubmit}
  onCancel={handleCancel}
/>
```

**Props:**
- `onSubmit` (Function) - Função chamada ao enviar
- `onCancel` (Function) - Função chamada ao cancelar

## 🔌 APIs e Serviços

### Endpoints Utilizados

- `GET https://wswork.com.br/cars.json` - Lista de todos os carros
- `GET https://wswork.com.br/cars_by_brand.json` - Carros agrupados por marca

### Serviços Disponíveis

```javascript
import { 
  getCars, 
  getCarsByBrand, 
  createCar, 
  updateCar, 
  deleteCar 
} from './services/api';

// Buscar carros
const cars = await getCars();

// Buscar por marca
const carsByBrand = await getCarsByBrand();

// Criar novo carro
const newCar = await createCar(carData);
```

## 🎯 Funcionalidades Principais

### 1. Listagem de Veículos

- **Agrupamento automático** por marca
- **Layout responsivo** em grid
- **Loading states** e tratamento de erros
- **Retry automático** em falhas de rede

### 2. Cadastro de Veículos

- **Validação completa** de formulário
- **Campos obrigatórios** marcados
- **Feedback visual** de erros
- **Estados de loading** durante envio

### 3. Formatação de Dados

- **Preços** em formato brasileiro (R$ 50.000,00)
- **Datas** em formato dd/mm/aaaa
- **Combustível** traduzido (FLEX → Flex)
- **Cores** capitalizadas (AZUL → Azul)

## 🎨 Design e UX

### Características Visuais

- **Paleta de cores** moderna e profissional
- **Gradientes** suaves e elegantes
- **Animações** fluidas e responsivas
- **Tipografia** clara e legível

### Responsividade

- **Mobile First** - Otimizado para dispositivos móveis
- **Breakpoints** em 768px e 480px
- **Grid adaptativo** - Ajusta colunas automaticamente
- **Touch friendly** - Botões e interações otimizadas

## 🚀 Deploy e Hospedagem

### Build de Produção

```bash
npm run build
```

### Opções de Hospedagem

- **Netlify** - Deploy automático via Git
- **Vercel** - Deploy com preview automático
- **GitHub Pages** - Hospedagem gratuita
- **AWS S3** - Hospedagem escalável

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_API_BASE_URL=https://wswork.com.br
REACT_APP_ENVIRONMENT=production
```

## 🧪 Testes

### Executar Testes

```bash
npm test
```

### Cobertura de Testes

```bash
npm test -- --coverage
```

## 📝 Decisões Técnicas

### 1. Arquitetura de Componentes

- **Componentes funcionais** com hooks
- **Separação de responsabilidades** clara
- **Reutilização máxima** de código
- **Props drilling** minimizado

### 2. Gerenciamento de Estado

- **useState** para estado local
- **useEffect** para side effects
- **Estado centralizado** quando necessário
- **Imutabilidade** mantida

### 3. Performance

- **Lazy loading** de componentes
- **Memoização** de funções pesadas
- **Debounce** em inputs
- **Otimização** de re-renders

### 4. Acessibilidade

- **Semântica HTML** correta
- **ARIA labels** em elementos interativos
- **Navegação por teclado** suportada
- **Contraste** adequado

## 🔧 Configurações

### ESLint

O projeto usa ESLint para manter qualidade do código:

```json
{
  "extends": [
    "react-app",
    "react-app/jest"
  ]
}
```

### Browserslist

Suporte aos navegadores:

```json
{
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

## 🤝 Contribuição

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- **ESLint** - Linting automático
- **Prettier** - Formatação consistente
- **Conventional Commits** - Padrão de commits
- **Componentes funcionais** - Preferência por hooks

## 📄 Licença

Este projeto foi desenvolvido como teste técnico para a WS Work.

## 👨‍💻 Autor

Desenvolvido com ❤️ para o teste técnico da WS Work.

---

**Nota:** Este projeto consome dados de APIs externas. Certifique-se de que os endpoints estão disponíveis antes de executar a aplicação.
