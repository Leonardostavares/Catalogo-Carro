# Correção do Problema de CORS

## Problema
O frontend não consegue acessar o backend devido ao erro de CORS:
```
Access to fetch at 'https://car-catalog-backend-leonardo-ee72ebc72d08.herokuapp.com/api/carros' 
from origin 'https://car-catalog-frontend-leonardo-ee72ebc72d08.herokuapp.com' 
has been blocked by CORS policy
```

## Solução

### 1. Adicionar Configuração CORS no Backend

No arquivo `backend/car-catalog-backend/src/main/java/com/wswork/carcatalog/config/SecurityConfig.java`:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").permitAll()
                .anyRequest().authenticated()
            );
        
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### 2. Adicionar Dependência no pom.xml

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

### 3. Configuração Alternativa (mais simples)

Se preferir uma configuração mais simples, adicione no `application.properties`:

```properties
# CORS Configuration
spring.web.cors.allowed-origins=https://car-catalog-frontend-leonardo-ee72ebc72d08.herokuapp.com
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

### 4. Deploy do Backend

Após fazer as alterações:

```bash
cd backend/car-catalog-backend
git add .
git commit -m "fix: adicionar configuração CORS"
git push heroku master
```

### 5. Voltar ao Frontend Original

Após corrigir o CORS, você pode voltar ao código original no `App.js`:

```javascript
// Carregar carros do backend
const response = await fetch('https://car-catalog-backend-leonardo-ee72ebc72d08.herokuapp.com/api/carros');
const carrosBackend = await response.json();
```

## Status Atual
- ✅ Frontend funcionando com dados mockados
- ❌ Backend com problema de CORS
- 🔄 Aguardando correção do CORS no backend
