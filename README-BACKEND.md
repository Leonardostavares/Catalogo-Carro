# 🚗 Backend - Catálogo de Carros

API REST completa desenvolvida em Java/Spring Boot para gerenciamento de catálogo de carros.

## 🌐 **API Online**

- **Frontend**: [https://car-catalog-frontend-leonardo-44399dbbc729.herokuapp.com/](https://car-catalog-frontend-leonardo-44399dbbc729.herokuapp.com/)
- **API JSON**: [https://car-catalog-backend-leonardo-1f7a541f8578.herokuapp.com/api/carros](https://car-catalog-backend-leonardo-1f7a541f8578.herokuapp.com/api/carros)

## ✨ Funcionalidades da API

- **CRUD Completo** - Criar, ler, atualizar e deletar carros
- **Validação de Dados** - Validação automática de entrada
- **Tratamento de Erros** - Respostas padronizadas
- **CORS Configurado** - Acesso cross-origin permitido
- **Documentação Swagger** - API documentada automaticamente

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 21** - Linguagem principal
- **Spring Boot 3.x** - Framework backend
- **Spring Data JPA** - Persistência de dados
- **MySQL** - Banco de dados
- **Maven** - Gerenciamento de dependências

### Banco de Dados
- **MySQL** - Banco de dados principal
- **H2** - Banco de dados para testes
- **JPA/Hibernate** - ORM

## 📁 Estrutura do Projeto

```
Backend-Java/
├── car-catalog-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/wswork/carcatalog/
│   │   │   │   ├── CarCatalogBackendApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   ├── DataInitializer.java
│   │   │   │   │   └── SecurityConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── CarroController.java
│   │   │   │   │   ├── MarcaController.java
│   │   │   │   │   └── ModeloController.java
│   │   │   │   ├── dto/
│   │   │   │   │   ├── CarroDTO.java
│   │   │   │   │   ├── MarcaDTO.java
│   │   │   │   │   └── ModeloDTO.java
│   │   │   │   ├── entity/
│   │   │   │   │   ├── Carro.java
│   │   │   │   │   ├── Marca.java
│   │   │   │   │   └── Modelo.java
│   │   │   │   ├── repository/
│   │   │   │   │   ├── CarroRepository.java
│   │   │   │   │   ├── MarcaRepository.java
│   │   │   │   │   └── ModeloRepository.java
│   │   │   │   └── service/
│   │   │   │       ├── CarroService.java
│   │   │   │       ├── MarcaService.java
│   │   │   │       └── ModeloService.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── application-dev.properties
│   │   │       └── schema.sql
│   │   └── test/
│   ├── pom.xml
│   ├── Procfile
│   └── system.properties
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Java 21
- Maven 3.6+
- MySQL 8.0+ (ou H2 para desenvolvimento)

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd backend/car-catalog-backend
```

2. **Configure o banco de dados**
```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/car_catalog
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

3. **Execute a aplicação**
```bash
mvn spring-boot:run
```

4. **Acesse a API**
```
http://localhost:8080/api/carros
```

## 🔧 Configuração

### Variáveis de Ambiente
- `DATABASE_URL` - URL do banco de dados (Heroku)
- `SPRING_PROFILES_ACTIVE` - Perfil ativo (dev/prod)

### Configurações de Desenvolvimento
```properties
# application-dev.properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=create-drop
```

### Configurações de Produção
```properties
# application-prod.properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
```

## 📡 Endpoints da API

### Carros
- `GET /api/carros` - Listar todos os carros
- `GET /api/carros/{id}` - Buscar carro por ID
- `POST /api/carros` - Criar novo carro
- `PUT /api/carros/{id}` - Atualizar carro
- `DELETE /api/carros/{id}` - Deletar carro

### Marcas
- `GET /api/marcas` - Listar todas as marcas
- `GET /api/marcas/{id}` - Buscar marca por ID
- `POST /api/marcas` - Criar nova marca

### Modelos
- `GET /api/modelos` - Listar todos os modelos
- `GET /api/modelos/{id}` - Buscar modelo por ID
- `POST /api/modelos` - Criar novo modelo

## 📊 Modelos de Dados

### Carro
```java
@Entity
public class Carro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "marca_id")
    private Marca marca;
    
    @ManyToOne
    @JoinColumn(name = "modelo_id")
    private Modelo modelo;
    
    private Integer ano;
    private String combustivel;
    private Integer numPortas;
    private String cor;
    private BigDecimal valor;
    private LocalDateTime timestampCadastro;
}
```

### Marca
```java
@Entity
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    
    @OneToMany(mappedBy = "marca")
    private List<Carro> carros;
}
```

### Modelo
```java
@Entity
public class Modelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    
    @ManyToOne
    @JoinColumn(name = "marca_id")
    private Marca marca;
}
```

## 🔌 Integração com Frontend

### CORS Configurado
```java
@Configuration
public class SecurityConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### Formato de Resposta
```json
{
  "id": 1,
  "nomeModelo": "Corolla",
  "nomeMarca": "Toyota",
  "ano": 2020,
  "combustivel": "FLEX",
  "numPortas": 4,
  "cor": "PRETO",
  "valor": 120000.00,
  "timestampCadastro": "2024-01-15T10:30:00"
}
```

## 🧪 Testes

### Executar Testes
```bash
mvn test
```

### Testes de Integração
```bash
mvn test -Dtest=CarroControllerIntegrationTest
```

### Cobertura de Testes
```bash
mvn jacoco:report
```

## 📦 Build e Deploy

### Build Local
```bash
mvn clean package
```

### Deploy Heroku
```bash
# Configurar Heroku
heroku create car-catalog-backend-leonardo

# Deploy
git push heroku main
```

### Variáveis Heroku
```bash
heroku config:set SPRING_PROFILES_ACTIVE=prod
heroku config:set DATABASE_URL=jdbc:mysql://...
```

## 📚 Documentação da API

### Swagger UI
- **URL**: https://car-catalog-backend-leonardo-1f7a541f8578.herokuapp.com/swagger-ui.html
- **OpenAPI**: https://car-catalog-backend-leonardo-1f7a541f8578.herokuapp.com/v3/api-docs

### Endpoints de Saúde
- `GET /actuator/health` - Status da aplicação
- `GET /actuator/info` - Informações da aplicação

## 🔒 Segurança

### Configurações Implementadas
- CORS configurado para frontend
- Validação de entrada com Bean Validation
- Tratamento de exceções global
- Logs estruturados

### Validações
```java
@Valid
public class CarroDTO {
    @NotBlank(message = "Nome do modelo é obrigatório")
    private String nomeModelo;
    
    @NotNull(message = "Ano é obrigatório")
    @Min(value = 1900, message = "Ano deve ser maior que 1900")
    private Integer ano;
    
    @NotNull(message = "Valor é obrigatório")
    @DecimalMin(value = "0.0", message = "Valor deve ser positivo")
    private BigDecimal valor;
}
```

## 📊 Monitoramento

### Logs
- Logs estruturados com SLF4J
- Configuração para diferentes ambientes
- Logs de performance e erros

### Métricas
- Endpoints de saúde configurados
- Métricas básicas do Spring Boot Actuator
- Monitoramento de performance

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Desenvolvido com Java 21 e Spring Boot**
