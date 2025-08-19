package com.wswork.carcatalog.kotlin.service

import com.wswork.carcatalog.dto.MarcaDTO
import com.wswork.carcatalog.entity.Marca
import com.wswork.carcatalog.repository.MarcaRepository
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter

@Service
class MarcaService(private val marcaRepository: MarcaRepository) {
    
    private val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")
    
    fun listarTodas(): List<MarcaDTO> {
        return marcaRepository.findAll().map { marca ->
            MarcaDTO(
                id = marca.id,
                nomeMarca = marca.nomeMarca,
                dataCriacao = marca.dataCriacao.format(formatter),
                dataAtualizacao = marca.dataAtualizacao.format(formatter)
            )
        }
    }
    
    fun buscarPorId(id: Long): MarcaDTO? {
        return marcaRepository.findById(id).map { marca ->
            MarcaDTO(
                id = marca.id,
                nomeMarca = marca.nomeMarca,
                dataCriacao = marca.dataCriacao.format(formatter),
                dataAtualizacao = marca.dataAtualizacao.format(formatter)
            )
        }.orElse(null)
    }
    
    fun criar(marcaDTO: MarcaDTO): MarcaDTO {
        if (marcaRepository.existsByNomeMarca(marcaDTO.nomeMarca)) {
            throw RuntimeException("Marca já existe: ${marcaDTO.nomeMarca}")
        }
        
        val marca = Marca(nomeMarca = marcaDTO.nomeMarca)
        val marcaSalva = marcaRepository.save(marca)
        
        return MarcaDTO(
            id = marcaSalva.id,
            nomeMarca = marcaSalva.nomeMarca,
            dataCriacao = marcaSalva.dataCriacao.format(formatter),
            dataAtualizacao = marcaSalva.dataAtualizacao.format(formatter)
        )
    }
    
    fun atualizar(id: Long, marcaDTO: MarcaDTO): MarcaDTO {
        val marca = marcaRepository.findById(id)
            .orElseThrow { RuntimeException("Marca não encontrada com ID: $id") }
        
        marca.copy(nomeMarca = marcaDTO.nomeMarca)
        val marcaAtualizada = marcaRepository.save(marca)
        
        return MarcaDTO(
            id = marcaAtualizada.id,
            nomeMarca = marcaAtualizada.nomeMarca,
            dataCriacao = marcaAtualizada.dataCriacao.format(formatter),
            dataAtualizacao = marcaAtualizada.dataAtualizacao.format(formatter)
        )
    }
    
    fun deletar(id: Long) {
        if (!marcaRepository.existsById(id)) {
            throw RuntimeException("Marca não encontrada com ID: $id")
        }
        marcaRepository.deleteById(id)
    }
}
