package com.wswork.carcatalog.kotlin.service

import com.wswork.carcatalog.dto.ModeloDTO
import com.wswork.carcatalog.entity.Marca
import com.wswork.carcatalog.entity.Modelo
import com.wswork.carcatalog.repository.MarcaRepository
import com.wswork.carcatalog.repository.ModeloRepository
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter

@Service
class ModeloService(
    private val modeloRepository: ModeloRepository,
    private val marcaRepository: MarcaRepository
) {
    
    private val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")
    
    fun listarTodos(): List<ModeloDTO> {
        return modeloRepository.findAll().map { modelo ->
            ModeloDTO(
                id = modelo.id,
                nome = modelo.nome,
                valorFipe = modelo.valorFipe,
                marcaId = modelo.marca.id!!,
                dataCriacao = modelo.dataCriacao.format(formatter),
                dataAtualizacao = modelo.dataAtualizacao.format(formatter)
            )
        }
    }
    
    fun buscarPorId(id: Long): ModeloDTO? {
        return modeloRepository.findById(id).map { modelo ->
            ModeloDTO(
                id = modelo.id,
                nome = modelo.nome,
                valorFipe = modelo.valorFipe,
                marcaId = modelo.marca.id!!,
                dataCriacao = modelo.dataCriacao.format(formatter),
                dataAtualizacao = modelo.dataAtualizacao.format(formatter)
            )
        }.orElse(null)
    }
    
    fun buscarPorMarca(marcaId: Long): List<ModeloDTO> {
        return modeloRepository.findByMarcaId(marcaId).map { modelo ->
            ModeloDTO(
                id = modelo.id,
                nome = modelo.nome,
                valorFipe = modelo.valorFipe,
                marcaId = modelo.marca.id!!,
                dataCriacao = modelo.dataCriacao.format(formatter),
                dataAtualizacao = modelo.dataAtualizacao.format(formatter)
            )
        }
    }
    
    fun criar(modeloDTO: ModeloDTO): ModeloDTO {
        if (modeloRepository.existsByNome(modeloDTO.nome)) {
            throw RuntimeException("Modelo já existe: ${modeloDTO.nome}")
        }
        
        val marca = marcaRepository.findById(modeloDTO.marcaId)
            .orElseThrow { RuntimeException("Marca não encontrada com ID: ${modeloDTO.marcaId}") }
        
        val modelo = Modelo(
            nome = modeloDTO.nome,
            valorFipe = modeloDTO.valorFipe,
            marca = marca
        )
        
        val modeloSalvo = modeloRepository.save(modelo)
        
        return ModeloDTO(
            id = modeloSalvo.id,
            nome = modeloSalvo.nome,
            valorFipe = modeloSalvo.valorFipe,
            marcaId = modeloSalvo.marca.id!!,
            dataCriacao = modeloSalvo.dataCriacao.format(formatter),
            dataAtualizacao = modeloSalvo.dataAtualizacao.format(formatter)
        )
    }
    
    fun atualizar(id: Long, modeloDTO: ModeloDTO): ModeloDTO {
        val modelo = modeloRepository.findById(id)
            .orElseThrow { RuntimeException("Modelo não encontrado com ID: $id") }
        
        val marca = marcaRepository.findById(modeloDTO.marcaId)
            .orElseThrow { RuntimeException("Marca não encontrada com ID: ${modeloDTO.marcaId}") }
        
        val modeloAtualizado = modelo.copy(
            nome = modeloDTO.nome,
            valorFipe = modeloDTO.valorFipe,
            marca = marca
        )
        
        val modeloSalvo = modeloRepository.save(modeloAtualizado)
        
        return ModeloDTO(
            id = modeloSalvo.id,
            nome = modeloSalvo.nome,
            valorFipe = modeloSalvo.valorFipe,
            marcaId = modeloSalvo.marca.id!!,
            dataCriacao = modeloSalvo.dataCriacao.format(formatter),
            dataAtualizacao = modeloSalvo.dataAtualizacao.format(formatter)
        )
    }
    
    fun deletar(id: Long) {
        if (!modeloRepository.existsById(id)) {
            throw RuntimeException("Modelo não encontrado com ID: $id")
        }
        modeloRepository.deleteById(id)
    }
}
