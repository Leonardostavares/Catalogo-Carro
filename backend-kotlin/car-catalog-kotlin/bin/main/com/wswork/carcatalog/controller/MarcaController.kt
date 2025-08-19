package com.wswork.carcatalog.kotlin.controller

import com.wswork.carcatalog.dto.MarcaDTO
import com.wswork.carcatalog.service.MarcaService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/marcas")
@CrossOrigin(origins = ["*"])
class MarcaController(private val marcaService: MarcaService) {
    
    @GetMapping
    fun listarMarcas(): ResponseEntity<List<MarcaDTO>> {
        val marcas = marcaService.listarTodas()
        return ResponseEntity.ok(marcas)
    }
    
    @GetMapping("/{id}")
    fun buscarMarca(@PathVariable id: Long): ResponseEntity<MarcaDTO> {
        val marca = marcaService.buscarPorId(id)
        return ResponseEntity.ok(marca)
    }
    
    @PostMapping
    fun criarMarca(@RequestBody marcaDTO: MarcaDTO): ResponseEntity<MarcaDTO> {
        val marcaCriada = marcaService.criar(marcaDTO)
        return ResponseEntity.ok(marcaCriada)
    }
    
    @PutMapping("/{id}")
    fun atualizarMarca(
        @PathVariable id: Long,
        @RequestBody marcaDTO: MarcaDTO
    ): ResponseEntity<MarcaDTO> {
        val marcaAtualizada = marcaService.atualizar(id, marcaDTO)
        return ResponseEntity.ok(marcaAtualizada)
    }
    
    @DeleteMapping("/{id}")
    fun deletarMarca(@PathVariable id: Long): ResponseEntity<Void> {
        marcaService.deletar(id)
        return ResponseEntity.ok().build()
    }
}
