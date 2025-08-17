#!/bin/bash

echo "🚀 Iniciando deploy do backend na Heroku..."

# Navegar para o diretório do backend
cd backend/car-catalog-backend

# Verificar se o Heroku CLI está instalado
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI não encontrado. Instale em: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Fazer login no Heroku (se necessário)
echo "🔐 Fazendo login no Heroku..."
heroku login

# Criar app no Heroku (se não existir)
echo "📱 Criando app no Heroku..."
APP_NAME="car-catalog-backend-$(date +%s)"
heroku create $APP_NAME

# Adicionar addon do MySQL (ClearDB)
echo "🗄️ Adicionando banco MySQL..."
heroku addons:create cleardb:ignite --app $APP_NAME

# Configurar variáveis de ambiente
echo "⚙️ Configurando variáveis de ambiente..."
heroku config:set SPRING_PROFILES_ACTIVE=prod --app $APP_NAME

# Fazer build do projeto
echo "🔨 Fazendo build do projeto..."
mvn clean package -DskipTests

# Deploy para o Heroku
echo "📤 Fazendo deploy..."
git add .
git commit -m "Deploy para Heroku"
git push heroku main

# Verificar se o deploy foi bem-sucedido
echo "✅ Verificando deploy..."
heroku ps --app $APP_NAME

# Mostrar logs
echo "📋 Logs da aplicação:"
heroku logs --tail --app $APP_NAME

echo "🎉 Deploy do backend concluído!"
echo "🌐 URL do backend: https://$APP_NAME.herokuapp.com"
echo "📝 Guarde esta URL para configurar o frontend!"
