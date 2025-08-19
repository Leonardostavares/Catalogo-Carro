package com.wswork.carcatalog.kotlin.controller

import com.wswork.carcatalog.dto.CarroDTO
import com.wswork.carcatalog.dto.CarroRespostaDTO
import com.wswork.carcatalog.service.CarroService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/carros")
@CrossOrigin(origins = ["*"])
class CarroController(private val carroService: CarroService) {
    
    @GetMapping
    fun listarCarros(): ResponseEntity<List<CarroRespostaDTO>> {
        val carros = carroService.listarTodos()
        println("=== LISTANDO TODOS OS CARROS ===")
        println("Total de carros: ${carros.size}")
        carros.forEach { carro ->
            println("ID: ${carro.id} - Modelo: ${carro.nomeModelo}")
        }
        println("=====================================")
        return ResponseEntity.ok(carros)
    }
    
    @GetMapping("/{id}")
    fun buscarCarro(@PathVariable id: Long): ResponseEntity<CarroRespostaDTO> {
        val carro = carroService.buscarPorId(id)
        return ResponseEntity.ok(carro)
    }
    
    @PostMapping
    fun criarCarro(@RequestBody carroDTO: CarroDTO): ResponseEntity<CarroRespostaDTO> {
        val carroCriado = carroService.criar(carroDTO)
        return ResponseEntity.ok(carroCriado)
    }
    
    @PutMapping("/{id}")
    fun atualizarCarro(
        @PathVariable id: Long,
        @RequestBody carroDTO: CarroDTO
    ): ResponseEntity<CarroRespostaDTO> {
        val carroAtualizado = carroService.atualizar(id, carroDTO)
        return ResponseEntity.ok(carroAtualizado)
    }
    
    @DeleteMapping("/{id}")
    fun deletarCarro(@PathVariable id: Long): ResponseEntity<Void> {
        carroService.deletar(id)
        return ResponseEntity.ok().build()
    }
    
    @GetMapping("/modelo/{modeloId}")
    fun buscarCarrosPorModelo(@PathVariable modeloId: Long): ResponseEntity<List<CarroRespostaDTO>> {
        val carros = carroService.buscarPorModelo(modeloId)
        return ResponseEntity.ok(carros)
    }
}
