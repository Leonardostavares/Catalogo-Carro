package com.wswork.carcatalog.kotlin.service

import com.wswork.carcatalog.dto.CarroDTO
import com.wswork.carcatalog.dto.CarroRespostaDTO
import com.wswork.carcatalog.entity.Carro
import com.wswork.carcatalog.entity.Modelo
import com.wswork.carcatalog.repository.CarroRepository
import com.wswork.carcatalog.repository.ModeloRepository
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter

@Service
class CarroService(
    private val carroRepository: CarroRepository,
    private val modeloRepository: ModeloRepository
) {
    
    private val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")
    
    fun listarTodos(): List<CarroRespostaDTO> {
        return carroRepository.findAll().map { carro ->
            mapearParaRespostaDTO(carro)
        }
    }
    
    fun buscarPorId(id: Long): CarroRespostaDTO? {
        return carroRepository.findById(id).map { carro ->
            mapearParaRespostaDTO(carro)
        }.orElse(null)
    }
    
    fun buscarPorModelo(modeloId: Long): List<CarroRespostaDTO> {
        return carroRepository.findByModeloId(modeloId).map { carro ->
            mapearParaRespostaDTO(carro)
        }
    }
    
    fun criar(carroDTO: CarroDTO): CarroRespostaDTO {
        val modelo = modeloRepository.findById(carroDTO.modeloId)
            .orElseThrow { RuntimeException("Modelo não encontrado com ID: ${carroDTO.modeloId}") }
        
        val carro = Carro(
            timestampCadastro = carroDTO.timestampCadastro,
            ano = carroDTO.ano,
            combustivel = carroDTO.combustivel,
            numPortas = carroDTO.numPortas,
            cor = carroDTO.cor,
            valor = carroDTO.valor,
            modelo = modelo
        )
        
        val carroSalvo = carroRepository.save(carro)
        return mapearParaRespostaDTO(carroSalvo)
    }
    
    fun atualizar(id: Long, carroDTO: CarroDTO): CarroRespostaDTO {
        val carro = carroRepository.findById(id)
            .orElseThrow { RuntimeException("Carro não encontrado com ID: $id") }
        
        val modelo = modeloRepository.findById(carroDTO.modeloId)
            .orElseThrow { RuntimeException("Modelo não encontrado com ID: ${carroDTO.modeloId}") }
        
        val carroAtualizado = carro.copy(
            ano = carroDTO.ano,
            combustivel = carroDTO.combustivel,
            numPortas = carroDTO.numPortas,
            cor = carroDTO.cor,
            valor = carroDTO.valor,
            modelo = modelo
        )
        
        val carroSalvo = carroRepository.save(carroAtualizado)
        return mapearParaRespostaDTO(carroSalvo)
    }
    
    fun deletar(id: Long) {
        if (!carroRepository.existsById(id)) {
            throw RuntimeException("Carro não encontrado com ID: $id")
        }
        carroRepository.deleteById(id)
    }
    
    private fun mapearParaRespostaDTO(carro: Carro): CarroRespostaDTO {
        return CarroRespostaDTO(
            id = carro.id!!,
            nomeModelo = carro.modelo.nome,
            nomeMarca = carro.modelo.marca.nomeMarca,
            ano = carro.ano,
            combustivel = carro.combustivel,
            numPortas = carro.numPortas,
            cor = carro.cor,
            valor = carro.valor,
            timestampCadastro = carro.timestampCadastro,
            dataCriacao = carro.dataCriacao.format(formatter),
            dataAtualizacao = carro.dataAtualizacao.format(formatter)
        )
    }
}
