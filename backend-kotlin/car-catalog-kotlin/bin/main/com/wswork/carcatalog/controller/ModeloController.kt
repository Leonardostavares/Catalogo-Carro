package com.wswork.carcatalog.kotlin.controller

import com.wswork.carcatalog.dto.ModeloDTO
import com.wswork.carcatalog.service.ModeloService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/modelos")
@CrossOrigin(origins = ["*"])
class ModeloController(private val modeloService: ModeloService) {
    
    @GetMapping
    fun listarModelos(): ResponseEntity<List<ModeloDTO>> {
        val modelos = modeloService.listarTodos()
        return ResponseEntity.ok(modelos)
    }
    
    @GetMapping("/{id}")
    fun buscarModelo(@PathVariable id: Long): ResponseEntity<ModeloDTO> {
        val modelo = modeloService.buscarPorId(id)
        return ResponseEntity.ok(modelo)
    }
    
    @GetMapping("/marca/{marcaId}")
    fun buscarModelosPorMarca(@PathVariable marcaId: Long): ResponseEntity<List<ModeloDTO>> {
        val modelos = modeloService.buscarPorMarca(marcaId)
        return ResponseEntity.ok(modelos)
    }
    
    @PostMapping
    fun criarModelo(@RequestBody modeloDTO: ModeloDTO): ResponseEntity<ModeloDTO> {
        val modeloCriado = modeloService.criar(modeloDTO)
        return ResponseEntity.ok(modeloCriado)
    }
    
    @PutMapping("/{id}")
    fun atualizarModelo(
        @PathVariable id: Long,
        @RequestBody modeloDTO: ModeloDTO
    ): ResponseEntity<ModeloDTO> {
        val modeloAtualizado = modeloService.atualizar(id, modeloDTO)
        return ResponseEntity.ok(modeloAtualizado)
    }
    
    @DeleteMapping("/{id}")
    fun deletarModelo(@PathVariable id: Long): ResponseEntity<Void> {
        modeloService.deletar(id)
        return ResponseEntity.ok().build()
    }
}
