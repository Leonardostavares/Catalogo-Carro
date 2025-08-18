#!/bin/bash

echo "🚀 Iniciando deploy do Backend Kotlin no Heroku..."

# Navegar para o diretório do projeto Kotlin
cd car-catalog-kotlin

# Verificar se o Heroku CLI está instalado
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI não encontrado. Instale em: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Verificar se está logado no Heroku
if ! heroku auth:whoami &> /dev/null; then
    echo "🔐 Faça login no Heroku:"
    heroku login
fi

# Nome do app (você pode alterar)
APP_NAME="car-catalog-kotlin-backend"

echo "📦 Criando app no Heroku: $APP_NAME"

# Criar novo app no Heroku
heroku create $APP_NAME

# Configurar variáveis de ambiente
echo "⚙️ Configurando variáveis de ambiente..."
heroku config:set SPRING_PROFILES_ACTIVE=prod

# Fazer deploy
echo "📤 Fazendo deploy..."
git add .
git commit -m "Deploy backend Kotlin"
git push heroku main

echo "✅ Deploy concluído!"
echo "🌐 URL do app: https://$APP_NAME.herokuapp.com"
echo "📊 Logs: heroku logs --tail -a $APP_NAME"
