# Deploy Backend Kotlin - Heroku

## Pré-requisitos

1. **Nova conta no Heroku**
   - Acesse: https://signup.heroku.com/
   - Use email diferente da conta atual
   - Complete o cadastro

2. **Heroku CLI instalado**
   - Download: https://devcenter.heroku.com/articles/heroku-cli

## Passos para Deploy

### 1. Login na nova conta
```bash
heroku login
```

### 2. Executar script de deploy
```bash
# No diretório backend-kotlin
./deploy-kotlin.sh
```

### 3. Ou fazer deploy manualmente
```bash
cd car-catalog-kotlin

# Criar app
heroku create car-catalog-kotlin-backend

# Configurar variáveis
heroku config:set SPRING_PROFILES_ACTIVE=prod

# Deploy
git add .
git commit -m "Deploy backend Kotlin"
git push heroku main
```

## Endpoints Disponíveis

- `GET /api/carros` - Listar carros
- `GET /api/marcas` - Listar marcas  
- `GET /api/modelos` - Listar modelos
- `POST /api/carros` - Criar carro
- `PUT /api/carros/{id}` - Atualizar carro
- `DELETE /api/carros/{id}` - Deletar carro

## Verificar Deploy

```bash
# Ver logs
heroku logs --tail -a car-catalog-kotlin-backend

# Ver status
heroku ps -a car-catalog-kotlin-backend

# Abrir app
heroku open -a car-catalog-kotlin-backend
```

## Configurações

- **Java**: 21
- **Framework**: Spring Boot 3.2.0
- **Database**: H2 (desenvolvimento) / MySQL (produção)
- **Port**: Heroku define automaticamente

## Troubleshooting

### Erro de build
```bash
heroku logs --tail -a car-catalog-kotlin-backend
```

### Verificar configurações
```bash
heroku config -a car-catalog-kotlin-backend
```

### Reiniciar app
```bash
heroku restart -a car-catalog-kotlin-backend
```
