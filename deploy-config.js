// Configuração para deploy
const config = {
  // URL do backend local
  localBackend: 'http://localhost:8080',
  
  // URL do backend na Heroku (será substituída após o deploy)
  herokuBackend: 'https://seu-app-backend.herokuapp.com',
  
  // URL do frontend na Heroku (será substituída após o deploy)
  herokuFrontend: 'https://seu-app-frontend.herokuapp.com'
};

export default config;
