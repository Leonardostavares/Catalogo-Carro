package com.wswork.carcatalog.controller;

import com.wswork.carcatalog.dto.CarroDTO;
import com.wswork.carcatalog.dto.CarroFormatadoDTO;
import com.wswork.carcatalog.dto.CarroRespostaDTO;
import com.wswork.carcatalog.entity.Carro;
import com.wswork.carcatalog.entity.Marca;
import com.wswork.carcatalog.entity.Modelo;
import com.wswork.carcatalog.repository.CarroRepository;
import com.wswork.carcatalog.repository.MarcaRepository;
import com.wswork.carcatalog.repository.ModeloRepository;
import com.wswork.carcatalog.service.CarroService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Controller para operações REST relacionadas a Carro
 */
@RestController
@RequestMapping("/api/carros")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Permite requisições de qualquer origem
public class CarroController {
    
    private final CarroService carroService;
    private final CarroRepository carroRepository;
    private final MarcaRepository marcaRepository;
    private final ModeloRepository modeloRepository;
    
    /**
     * GET /api/carros - Listar todos os carros
     */
    @GetMapping
    public ResponseEntity<List<CarroRespostaDTO>> listarTodos() {
        List<CarroRespostaDTO> carros = carroService.buscarTodos();
        System.out.println("📋 === LISTANDO TODOS OS CARROS ===");
        System.out.println("Total de carros: " + carros.size());
        carros.forEach(carro -> System.out.println("ID: " + carro.getId() + " - Modelo: " + carro.getNomeModelo()));
        System.out.println("=====================================");
        return ResponseEntity.ok(carros);
    }
    
    /**
     * GET /api/carros/{id} - Buscar carro por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<CarroRespostaDTO> buscarPorId(@PathVariable Long id) {
        System.out.println("🔍 === BUSCANDO CARRO POR ID ===");
        System.out.println("ID solicitado: " + id + " (tipo: " + id.getClass().getSimpleName() + ")");
        
        Optional<CarroRespostaDTO> carro = carroService.buscarPorId(id);
        
        if (carro.isPresent()) {
            System.out.println("✅ Carro encontrado: " + carro.get().getNomeModelo());
            return ResponseEntity.ok(carro.get());
        } else {
            System.out.println("❌ Carro não encontrado com ID: " + id);
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * GET /api/carros/modelo/{modeloId} - Buscar carros por modelo
     */
    @GetMapping("/modelo/{modeloId}")
    public ResponseEntity<List<CarroRespostaDTO>> buscarPorModelo(@PathVariable Long modeloId) {
        List<CarroRespostaDTO> carros = carroService.buscarPorModelo(modeloId);
        return ResponseEntity.ok(carros);
    }
    
    /**
     * GET /api/carros/ano/{ano} - Buscar carros por ano
     */
    @GetMapping("/ano/{ano}")
    public ResponseEntity<List<CarroRespostaDTO>> buscarPorAno(@PathVariable Integer ano) {
        List<CarroRespostaDTO> carros = carroService.buscarPorAno(ano);
        return ResponseEntity.ok(carros);
    }
    
    /**
     * GET /api/carros/combustivel/{combustivel} - Buscar carros por combustível
     */
    @GetMapping("/combustivel/{combustivel}")
    public ResponseEntity<List<CarroRespostaDTO>> buscarPorCombustivel(@PathVariable String combustivel) {
        List<CarroRespostaDTO> carros = carroService.buscarPorCombustivel(combustivel);
        return ResponseEntity.ok(carros);
    }
    
    /**
     * GET /api/carros/cor/{cor} - Buscar carros por cor
     */
    @GetMapping("/cor/{cor}")
    public ResponseEntity<List<CarroRespostaDTO>> buscarPorCor(@PathVariable String cor) {
        List<CarroRespostaDTO> carros = carroService.buscarPorCor(cor);
        return ResponseEntity.ok(carros);
    }
    
    /**
     * GET /api/carros/preco?min={min}&max={max} - Buscar carros por faixa de preço
     */
    @GetMapping("/preco")
    public ResponseEntity<List<CarroRespostaDTO>> buscarPorFaixaPreco(
            @RequestParam Double min, 
            @RequestParam Double max) {
        List<CarroRespostaDTO> carros = carroService.buscarPorFaixaPreco(min, max);
        return ResponseEntity.ok(carros);
    }
    
    /**
     * GET /api/carros/marca/{marcaId} - Buscar carros por marca
     */
    @GetMapping("/marca/{marcaId}")
    public ResponseEntity<List<CarroRespostaDTO>> buscarPorMarca(@PathVariable Long marcaId) {
        List<CarroRespostaDTO> carros = carroService.buscarPorMarca(marcaId);
        return ResponseEntity.ok(carros);
    }
    
    /**
     * POST /api/carros - Criar novo carro
     */
    @PostMapping
    public ResponseEntity<?> criar(@Valid @RequestBody CarroDTO carroDTO) {
        try {
            System.out.println("🚗 === DADOS RECEBIDOS NO BACKEND ===");
            System.out.println("CarroDTO: " + carroDTO);
            System.out.println("=====================================");
            
            CarroRespostaDTO carroCriado = carroService.criar(carroDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(carroCriado);
        } catch (RuntimeException e) {
            System.out.println("🚨 ERRO NO BACKEND: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            System.out.println("🚨 ERRO GERAL NO BACKEND: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", "Erro interno do servidor"));
        }
    }
    
    /**
     * PUT /api/carros/{id} - Atualizar carro existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<CarroRespostaDTO> atualizar(@PathVariable Long id, @Valid @RequestBody CarroDTO carroDTO) {
        try {
            System.out.println("🚗 === ATUALIZANDO CARRO ===");
            System.out.println("ID recebido: " + id + " (tipo: " + id.getClass().getSimpleName() + ")");
            System.out.println("Dados recebidos: " + carroDTO);
            System.out.println("Nome Modelo recebido: " + carroDTO.getNomeModelo());
            System.out.println("Nome Marca recebido: " + carroDTO.getNomeMarca());
            System.out.println("=============================");
            
            CarroRespostaDTO carroAtualizado = carroService.atualizar(id, carroDTO);
            return ResponseEntity.ok(carroAtualizado);
        } catch (RuntimeException e) {
            System.out.println("🚨 ERRO AO ATUALIZAR CARRO: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * DELETE /api/carros/{id} - Deletar carro
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            System.out.println("🗑️ === DELETANDO CARRO ===");
            System.out.println("ID recebido: " + id + " (tipo: " + id.getClass().getSimpleName() + ")");
            System.out.println("=============================");
            
            carroService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            System.out.println("🚨 ERRO AO DELETAR CARRO: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * GET /api/carros/modelos/formatado - Listar carros no formato cars.json
     */
    @GetMapping("/modelos/formatado")
    public ResponseEntity<Map<String, List<CarroFormatadoDTO>>> listarModelosFormatados() {
        try {
            List<CarroFormatadoDTO> carrosFormatados = carroService.buscarTodosFormatados();
            Map<String, List<CarroFormatadoDTO>> resposta = new HashMap<>();
            resposta.put("cars", carrosFormatados);
            
            System.out.println("🚗 === ENDPOINT FORMATADO CHAMADO ===");
            System.out.println("Total de carros: " + carrosFormatados.size());
            System.out.println("=====================================");
            
            return ResponseEntity.ok(resposta);
        } catch (Exception e) {
            System.out.println("🚨 ERRO NO ENDPOINT FORMATADO: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * GET /api/carros/debug/existe/{id} - Verificar se carro existe (debug)
     */
    @GetMapping("/debug/existe/{id}")
    public ResponseEntity<Map<String, Object>> verificarSeExiste(@PathVariable Long id) {
        System.out.println("🔍 === DEBUG: VERIFICANDO SE CARRO EXISTE ===");
        System.out.println("ID verificado: " + id + " (tipo: " + id.getClass().getSimpleName() + ")");
        
        boolean existe = carroService.existePorId(id);
        System.out.println("Resultado: " + (existe ? "EXISTE" : "NÃO EXISTE"));
        System.out.println("=============================================");
        
        Map<String, Object> resposta = new HashMap<>();
        resposta.put("id", id);
        resposta.put("existe", existe);
        resposta.put("timestamp", System.currentTimeMillis());
        
        return ResponseEntity.ok(resposta);
    }
    
    /**
     * POST /api/carros/debug/criar-dados-teste - Criar dados de teste
     */
    @PostMapping("/debug/criar-dados-teste")
    public ResponseEntity<Map<String, Object>> criarDadosTeste() {
        try {
            System.out.println("🚗 === CRIANDO DADOS DE TESTE ===");
            
            // Criar marcas
            Marca volkswagen = new Marca();
            volkswagen.setNomeMarca("Volkswagen");
            volkswagen = marcaRepository.save(volkswagen);
            
            Marca honda = new Marca();
            honda.setNomeMarca("Honda");
            honda = marcaRepository.save(honda);
            
            Marca chevrolet = new Marca();
            chevrolet.setNomeMarca("Chevrolet");
            chevrolet = marcaRepository.save(chevrolet);
            
            // Criar modelos
            Modelo golf = new Modelo();
            golf.setNome("Golf GTI");
            golf.setMarca(volkswagen);
            golf = modeloRepository.save(golf);
            
            Modelo civic = new Modelo();
            civic.setNome("Civic");
            civic.setMarca(honda);
            civic = modeloRepository.save(civic);
            
            Modelo cruze = new Modelo();
            cruze.setNome("Cruze");
            cruze.setMarca(chevrolet);
            cruze = modeloRepository.save(cruze);
            
            // Criar carros
            Carro carro1 = new Carro(golf, 2023, "FLEX", 4, "BRANCO", 150000.0);
            carroRepository.save(carro1);
            
            Carro carro2 = new Carro(civic, 2022, "FLEX", 4, "PRETO", 130000.0);
            carroRepository.save(carro2);
            
            Carro carro3 = new Carro(cruze, 2021, "FLEX", 4, "AZUL", 110000.0);
            carroRepository.save(carro3);
            
            System.out.println("✅ Dados de teste criados com sucesso!");
            System.out.println("=====================================");
            
            Map<String, Object> resposta = new HashMap<>();
            resposta.put("mensagem", "Dados de teste criados com sucesso");
            resposta.put("carros_criados", 3);
            resposta.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(resposta);
        } catch (Exception e) {
            System.out.println("🚨 ERRO AO CRIAR DADOS DE TESTE: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> resposta = new HashMap<>();
            resposta.put("erro", e.getMessage());
            resposta.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.internalServerError().body(resposta);
        }
    }
    
    /**
     * Handler para erros de validação
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new java.util.HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            String fieldName = error.getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        System.out.println("🚨 ERROS DE VALIDAÇÃO: " + errors);
        return ResponseEntity.badRequest().body(errors);
    }
}
