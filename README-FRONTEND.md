# 🚗 Frontend - Catálogo de Carros

Aplicação React moderna para gerenciamento de catálogo de carros com integração completa ao backend Java/Spring Boot.

## 🌐 **Aplicação Online**

- **Frontend**: [https://car-catalog-frontend-leonardo-44399dbbc729.herokuapp.com/](https://car-catalog-frontend-leonardo-44399dbbc729.herokuapp.com/)
- **Backend API**: [https://car-catalog-backend-leonardo.herokuapp.com](https://car-catalog-backend-leonardo.herokuapp.com)
- **Dados JSON**: [https://car-catalog-backend-leonardo.herokuapp.com/api/carros](https://car-catalog-backend-leonardo.herokuapp.com/api/carros)
- **API Alternativa**: [https://car-catalog-backend-leonardo.herokuapp.com/carros](https://car-catalog-backend-leonardo.herokuapp.com/carros)

## ✨ Funcionalidades

- **Listagem de Carros** - Visualização organizada por marcas
- **Busca Avançada** - Filtros por marca e modelo
- **Gestão de Carros** - Adicionar, editar e excluir carros
- **Interface Responsiva** - Funciona em desktop e mobile
- **Integração com Backend** - API REST completa
- **Notificações** - Feedback visual para o usuário

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **React Router** - Navegação entre páginas
- **Context API** - Gerenciamento de estado global
- **CSS3** - Estilização moderna e responsiva
- **JavaScript ES6+** - Funcionalidades avançadas

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── contexts/           # Contexto global
│   │   └── CarContext.js
│   ├── hooks/             # Hooks personalizados
│   │   ├── useCarManagement.js
│   │   ├── useSearch.js
│   │   └── useNotification.js
│   ├── utils/             # Funções utilitárias
│   │   └── carUtils.js
│   ├── pages/             # Páginas da aplicação
│   │   ├── HomePage.js
│   │   └── BrandPage.js
│   ├── components/        # Componentes React
│   │   ├── BrandList/
│   │   ├── BrandCars/
│   │   ├── CarForm/
│   │   ├── CarCard/
│   │   ├── SearchBar/
│   │   ├── EditCarModal/
│   │   ├── DeleteConfirmModal/
│   │   └── Notification/
│   ├── services/          # Serviços de API
│   │   └── api.js
│   ├── App.js            # Componente principal
│   └── index.js          # Ponto de entrada
├── public/               # Arquivos públicos
├── package.json          # Dependências
└── README.md            # Documentação
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn
- Backend Java/Spring Boot rodando

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente (opcional)**
```bash
# Crie um arquivo .env na raiz do frontend
REACT_APP_BACKEND_URL=https://car-catalog-backend-leonardo.herokuapp.com
```

4. **Execute a aplicação**
```bash
npm start
```

5. **Acesse no navegador**
```
http://localhost:3000
```

## 🔧 Configuração

### Variáveis de Ambiente
- `REACT_APP_BACKEND_URL` - URL da API backend

### Backend
O backend Java/Spring Boot está hospedado no Heroku e já configurado para uso.
- **URL**: https://car-catalog-backend-leonardo.herokuapp.com
- **Stack**: Java (Cedar)
- **Status**: ✅ Ativo

### Frontend
O frontend React está hospedado no Heroku e disponível em:
- **URL**: https://car-catalog-frontend-leonardo-44399dbbc729.herokuapp.com/
- **Stack**: Node.js (Cedar)
- **Status**: ✅ Ativo

## 📱 Funcionalidades Detalhadas

### 1. Listagem de Carros
- Visualização organizada por marcas
- Contador de carros por marca
- Ordenação por quantidade de carros

### 2. Busca Avançada
- Filtro por marca (dropdown)
- Filtro por modelo (texto livre)
- Resultados em tempo real
- Histórico de navegação

### 3. Gestão de Carros
- **Adicionar**: Formulário completo com validação
- **Editar**: Modal com dados pré-preenchidos
- **Excluir**: Confirmação antes da exclusão

### 4. Interface Responsiva
- Design adaptativo para diferentes telas
- Componentes otimizados para mobile
- Navegação intuitiva

## 🎨 Componentes Principais

### CarContext
Gerenciamento global do estado dos carros, incluindo:
- Lista de carros
- Estados de loading
- Operações CRUD

### useCarManagement
Hook personalizado para operações de carros:
- Criação, edição e exclusão
- Validação de dados
- Tratamento de erros

### useSearch
Hook para funcionalidades de busca:
- Filtros por marca e modelo
- Histórico de navegação
- Estados de busca

## 🔌 Integração com API

### Endpoints Utilizados
- `GET /api/carros` - Listar carros
- `POST /api/carros` - Criar carro
- `PUT /api/carros/{id}` - Atualizar carro
- `DELETE /api/carros/{id}` - Excluir carro
- `GET /api/carros/{id}` - Verificar existência

### Formato de Dados
```javascript
// Carro (Frontend)
{
  id: number,
  nome_modelo: string,
  marca: string,
  ano: number,
  combustivel: string,
  num_portas: number,
  cor: string,
  valor: number,
  timestamp_cadastro: number,
  origem: 'backend' | 'api_externa'
}

// Carro (Backend)
{
  id: number,
  nomeModelo: string,
  nomeMarca: string,
  ano: number,
  combustivel: string,
  numPortas: number,
  cor: string,
  valor: number,
  timestampCadastro: number
}
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

## 📦 Build de Produção

### Gerar Build
```bash
npm run build
```

### Servir Build Localmente
```bash
npx serve -s build
```

## 🚀 Deploy

### Heroku
```bash
# Deploy automático
git push heroku main
```

### Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Desenvolvido com React e integração Spring Boot**
