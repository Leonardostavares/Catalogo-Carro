package com.wswork.carcatalog.controller;

import com.wswork.carcatalog.dto.MarcaDTO;
import com.wswork.carcatalog.service.MarcaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller para operações REST relacionadas a Marca
 */
@RestController
@RequestMapping("/api/marcas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Permite requisições de qualquer origem
public class MarcaController {
    
    private final MarcaService marcaService;
    
    /**
     * GET /api/marcas - Listar todas as marcas
     */
    @GetMapping
    public ResponseEntity<List<MarcaDTO>> listarTodas() {
        List<MarcaDTO> marcas = marcaService.buscarTodas();
        return ResponseEntity.ok(marcas);
    }
    
    /**
     * GET /api/marcas/{id} - Buscar marca por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<MarcaDTO> buscarPorId(@PathVariable Long id) {
        Optional<MarcaDTO> marca = marcaService.buscarPorId(id);
        
        if (marca.isPresent()) {
            return ResponseEntity.ok(marca.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * GET /api/marcas/buscar?nome={nome} - Buscar marca por nome
     */
    @GetMapping("/buscar")
    public ResponseEntity<MarcaDTO> buscarPorNome(@RequestParam String nome) {
        Optional<MarcaDTO> marca = marcaService.buscarPorNome(nome);
        
        if (marca.isPresent()) {
            return ResponseEntity.ok(marca.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * POST /api/marcas - Criar nova marca
     */
    @PostMapping
    public ResponseEntity<MarcaDTO> criar(@Valid @RequestBody MarcaDTO marcaDTO) {
        try {
            MarcaDTO marcaCriada = marcaService.criar(marcaDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(marcaCriada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * PUT /api/marcas/{id} - Atualizar marca existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<MarcaDTO> atualizar(@PathVariable Long id, @Valid @RequestBody MarcaDTO marcaDTO) {
        try {
            MarcaDTO marcaAtualizada = marcaService.atualizar(id, marcaDTO);
            return ResponseEntity.ok(marcaAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * DELETE /api/marcas/{id} - Deletar marca
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            marcaService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
