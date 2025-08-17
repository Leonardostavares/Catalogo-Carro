package com.wswork.carcatalog.controller;

import com.wswork.carcatalog.dto.ModeloDTO;
import com.wswork.carcatalog.service.ModeloService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller para operações REST relacionadas a Modelo
 */
@RestController
@RequestMapping("/api/modelos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Permite requisições de qualquer origem (necessário para Heroku)
public class ModeloController {
    
    private final ModeloService modeloService;
    
    /**
     * GET /api/modelos - Listar todos os modelos
     */
    @GetMapping
    public ResponseEntity<List<ModeloDTO>> listarTodos() {
        List<ModeloDTO> modelos = modeloService.buscarTodos();
        return ResponseEntity.ok(modelos);
    }
    
    /**
     * GET /api/modelos/{id} - Buscar modelo por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ModeloDTO> buscarPorId(@PathVariable Long id) {
        Optional<ModeloDTO> modelo = modeloService.buscarPorId(id);
        
        if (modelo.isPresent()) {
            return ResponseEntity.ok(modelo.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * GET /api/modelos/marca/{marcaId} - Buscar modelos por marca
     */
    @GetMapping("/marca/{marcaId}")
    public ResponseEntity<List<ModeloDTO>> buscarPorMarca(@PathVariable Long marcaId) {
        List<ModeloDTO> modelos = modeloService.buscarPorMarca(marcaId);
        return ResponseEntity.ok(modelos);
    }
    
    /**
     * GET /api/modelos/buscar?nome={nome} - Buscar modelos por nome
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<ModeloDTO>> buscarPorNome(@RequestParam String nome) {
        List<ModeloDTO> modelos = modeloService.buscarPorNome(nome);
        return ResponseEntity.ok(modelos);
    }
    
    /**
     * POST /api/modelos - Criar novo modelo
     */
    @PostMapping
    public ResponseEntity<ModeloDTO> criar(@Valid @RequestBody ModeloDTO modeloDTO) {
        try {
            ModeloDTO modeloCriado = modeloService.criar(modeloDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(modeloCriado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * PUT /api/modelos/{id} - Atualizar modelo existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<ModeloDTO> atualizar(@PathVariable Long id, @Valid @RequestBody ModeloDTO modeloDTO) {
        try {
            ModeloDTO modeloAtualizado = modeloService.atualizar(id, modeloDTO);
            return ResponseEntity.ok(modeloAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * DELETE /api/modelos/{id} - Deletar modelo
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            modeloService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
