#!/bin/bash

echo "🚀 Iniciando deploy do frontend na Heroku..."

# Verificar se o backend URL foi fornecida
if [ -z "$1" ]; then
    echo "❌ Erro: URL do backend é obrigatória!"
    echo "Uso: ./deploy-frontend.sh https://seu-backend.herokuapp.com"
    exit 1
fi

BACKEND_URL=$1

# Navegar para o diretório do frontend
cd frontend

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
APP_NAME="car-catalog-frontend-$(date +%s)"
heroku create $APP_NAME

# Configurar buildpack para React
echo "⚙️ Configurando buildpack..."
heroku buildpacks:set mars/create-react-app --app $APP_NAME

# Configurar variáveis de ambiente
echo "🔧 Configurando variáveis de ambiente..."
heroku config:set REACT_APP_BACKEND_URL=$BACKEND_URL --app $APP_NAME

# Fazer build do projeto
echo "🔨 Fazendo build do projeto..."
npm run build

# Deploy para o Heroku
echo "📤 Fazendo deploy..."
git add .
git commit -m "Deploy frontend para Heroku"
git push heroku main

# Verificar se o deploy foi bem-sucedido
echo "✅ Verificando deploy..."
heroku ps --app $APP_NAME

# Abrir a aplicação no navegador
echo "🌐 Abrindo aplicação..."
heroku open --app $APP_NAME

echo "🎉 Deploy do frontend concluído!"
echo "🌐 URL do frontend: https://$APP_NAME.herokuapp.com"
echo "🔗 URL do backend: $BACKEND_URL"
