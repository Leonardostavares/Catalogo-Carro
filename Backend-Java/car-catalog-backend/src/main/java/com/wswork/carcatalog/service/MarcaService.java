package com.wswork.carcatalog.service;

import com.wswork.carcatalog.dto.MarcaDTO;
import com.wswork.carcatalog.entity.Marca;
import com.wswork.carcatalog.repository.MarcaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service para operações de negócio relacionadas a Marca
 */
@Service
@RequiredArgsConstructor
@Transactional
public class MarcaService {
    
    private final MarcaRepository marcaRepository;
    
    /**
     * Buscar todas as marcas
     */
    @Transactional(readOnly = true)
    public List<MarcaDTO> buscarTodas() {
        return marcaRepository.findAll()
                .stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Buscar marca por ID
     */
    @Transactional(readOnly = true)
    public Optional<MarcaDTO> buscarPorId(Long id) {
        return marcaRepository.findById(id)
                .map(this::converterParaDTO);
    }
    
    /**
     * Buscar marca por nome
     */
    @Transactional(readOnly = true)
    public Optional<MarcaDTO> buscarPorNome(String nomeMarca) {
        return marcaRepository.findByNomeMarca(nomeMarca)
                .map(this::converterParaDTO);
    }
    
    /**
     * Criar nova marca
     */
    public MarcaDTO criar(MarcaDTO marcaDTO) {
        // Verificar se já existe marca com o mesmo nome
        if (marcaRepository.existsByNomeMarca(marcaDTO.getNomeMarca())) {
            throw new RuntimeException("Já existe uma marca com o nome: " + marcaDTO.getNomeMarca());
        }
        
        Marca marca = new Marca();
        marca.setNomeMarca(marcaDTO.getNomeMarca());
        marca.setDataCriacao(LocalDateTime.now());
        marca.setDataAtualizacao(LocalDateTime.now());
        
        Marca marcaSalva = marcaRepository.save(marca);
        return converterParaDTO(marcaSalva);
    }
    
    /**
     * Atualizar marca existente
     */
    public MarcaDTO atualizar(Long id, MarcaDTO marcaDTO) {
        Marca marca = marcaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca não encontrada com ID: " + id));
        
        // Verificar se o novo nome já existe em outra marca
        Optional<Marca> marcaExistente = marcaRepository.findByNomeMarca(marcaDTO.getNomeMarca());
        if (marcaExistente.isPresent() && !marcaExistente.get().getId().equals(id)) {
            throw new RuntimeException("Já existe uma marca com o nome: " + marcaDTO.getNomeMarca());
        }
        
        marca.setNomeMarca(marcaDTO.getNomeMarca());
        marca.setDataAtualizacao(LocalDateTime.now());
        
        Marca marcaAtualizada = marcaRepository.save(marca);
        return converterParaDTO(marcaAtualizada);
    }
    
    /**
     * Deletar marca
     */
    public void deletar(Long id) {
        if (!marcaRepository.existsById(id)) {
            throw new RuntimeException("Marca não encontrada com ID: " + id);
        }
        
        // Verificar se existem modelos associados
        // TODO: Implementar verificação de dependências
        
        marcaRepository.deleteById(id);
    }
    
    /**
     * Verificar se marca existe
     */
    @Transactional(readOnly = true)
    public boolean existePorId(Long id) {
        return marcaRepository.existsById(id);
    }
    
    /**
     * Converter Entity para DTO
     */
    private MarcaDTO converterParaDTO(Marca marca) {
        MarcaDTO dto = new MarcaDTO();
        dto.setId(marca.getId());
        dto.setNomeMarca(marca.getNomeMarca());
        dto.setDataCriacao(marca.getDataCriacao());
        dto.setDataAtualizacao(marca.getDataAtualizacao());
        return dto;
    }
}
