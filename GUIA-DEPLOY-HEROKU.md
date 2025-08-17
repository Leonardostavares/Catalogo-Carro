# 🚀 Guia de Deploy na Heroku

Este guia te ajudará a hospedar seu projeto full-stack na Heroku.

## 📋 Pré-requisitos

1. **Conta na Heroku**: Crie uma conta em [heroku.com](https://heroku.com)
2. **Heroku CLI**: Instale o CLI da Heroku
3. **Git**: Certifique-se de que o Git está configurado
4. **Node.js**: Para build do frontend
5. **Java 17**: Para build do backend

## 🔧 Instalação do Heroku CLI

### Windows:
```bash
# Baixe e instale de: https://devcenter.heroku.com/articles/heroku-cli
```

### macOS:
```bash
brew tap heroku/brew && brew install heroku
```

### Linux:
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

## 🚀 Deploy do Backend

### Passo 1: Login no Heroku
```bash
heroku login
```

### Passo 2: Navegar para o backend
```bash
cd backend/car-catalog-backend
```

### Passo 3: Criar app no Heroku
```bash
heroku create car-catalog-backend-[seu-nome]
```

### Passo 4: Adicionar banco MySQL
```bash
heroku addons:create cleardb:ignite
```

### Passo 5: Configurar variáveis de ambiente
```bash
heroku config:set SPRING_PROFILES_ACTIVE=prod
```

### Passo 6: Fazer build e deploy
```bash
mvn clean package -DskipTests
git add .
git commit -m "Deploy backend"
git push heroku main
```

### Passo 7: Verificar deploy
```bash
heroku ps
heroku logs --tail
```

**Guarde a URL do backend!** (ex: `https://car-catalog-backend-123.herokuapp.com`)

## 🌐 Deploy do Frontend

### Passo 1: Navegar para o frontend
```bash
cd frontend
```

### Passo 2: Criar app no Heroku
```bash
heroku create car-catalog-frontend-[seu-nome]
```

### Passo 3: Configurar buildpack
```bash
heroku buildpacks:set mars/create-react-app
```

### Passo 4: Configurar URL do backend
```bash
heroku config:set REACT_APP_BACKEND_URL=https://car-catalog-backend-[seu-nome].herokuapp.com
```

### Passo 5: Fazer build e deploy
```bash
npm run build
git add .
git commit -m "Deploy frontend"
git push heroku main
```

### Passo 6: Abrir aplicação
```bash
heroku open
```

## 🔄 Scripts Automatizados

Você também pode usar os scripts que criamos:

### Deploy do Backend:
```bash
chmod +x deploy-backend.sh
./deploy-backend.sh
```

### Deploy do Frontend:
```bash
chmod +x deploy-frontend.sh
./deploy-frontend.sh https://seu-backend.herokuapp.com
```

## 🛠️ Solução de Problemas

### Erro de Build
```bash
# Ver logs detalhados
heroku logs --tail

# Verificar status da aplicação
heroku ps
```

### Erro de CORS
- Verifique se a URL do frontend está configurada no backend
- Atualize as configurações CORS no `application.properties`

### Erro de Banco de Dados
```bash
# Verificar variáveis de ambiente
heroku config

# Verificar conexão com banco
heroku run java -jar target/car-catalog-backend-0.0.1-SNAPSHOT.jar
```

## 📊 Monitoramento

### Ver logs em tempo real:
```bash
heroku logs --tail --app [nome-do-app]
```

### Verificar status:
```bash
heroku ps --app [nome-do-app]
```

### Ver variáveis de ambiente:
```bash
heroku config --app [nome-do-app]
```

## 🔗 URLs Finais

Após o deploy, você terá:

- **Frontend**: `https://car-catalog-frontend-[seu-nome].herokuapp.com`
- **Backend**: `https://car-catalog-backend-[seu-nome].herokuapp.com`
- **API Endpoint**: `https://car-catalog-backend-[seu-nome].herokuapp.com/api/carros/modelos/formatado`

## 🎉 Próximos Passos

1. **Teste a aplicação** acessando a URL do frontend
2. **Verifique se os carros estão sendo carregados** corretamente
3. **Teste o formulário** para adicionar novos carros
4. **Compartilhe os links** com os recrutadores!

## 💡 Dicas

- **Nomes únicos**: Use nomes únicos para seus apps (ex: seu-nome + timestamp)
- **Logs**: Sempre verifique os logs se algo der errado
- **Variáveis de ambiente**: Nunca commite senhas ou URLs sensíveis
- **Backup**: Mantenha backup do código local

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs: `heroku logs --tail`
2. Consulte a documentação da Heroku
3. Verifique se todas as dependências estão no `pom.xml` e `package.json`

---

**🎯 Parabéns! Seu projeto está online e pronto para impressionar!**
