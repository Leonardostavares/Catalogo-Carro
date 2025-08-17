package com.wswork.carcatalog.service;

import com.wswork.carcatalog.dto.ModeloDTO;
import com.wswork.carcatalog.entity.Modelo;
import com.wswork.carcatalog.entity.Marca;
import com.wswork.carcatalog.repository.ModeloRepository;
import com.wswork.carcatalog.repository.MarcaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service para operações de negócio relacionadas a Modelo
 */
@Service
@RequiredArgsConstructor
@Transactional
public class ModeloService {
    
    private final ModeloRepository modeloRepository;
    private final MarcaRepository marcaRepository;
    
    /**
     * Buscar todos os modelos
     */
    @Transactional(readOnly = true)
    public List<ModeloDTO> buscarTodos() {
        return modeloRepository.findAll()
                .stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Buscar modelo por ID
     */
    @Transactional(readOnly = true)
    public Optional<ModeloDTO> buscarPorId(Long id) {
        return modeloRepository.findById(id)
                .map(this::converterParaDTO);
    }
    
    /**
     * Buscar modelos por marca
     */
    @Transactional(readOnly = true)
    public List<ModeloDTO> buscarPorMarca(Long marcaId) {
        return modeloRepository.findByMarcaId(marcaId)
                .stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Buscar modelos por nome (contendo)
     */
    @Transactional(readOnly = true)
    public List<ModeloDTO> buscarPorNome(String nome) {
        return modeloRepository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Criar novo modelo
     */
    public ModeloDTO criar(ModeloDTO modeloDTO) {
        // Verificar se a marca existe
        Marca marca = marcaRepository.findById(modeloDTO.getMarcaId())
                .orElseThrow(() -> new RuntimeException("Marca não encontrada com ID: " + modeloDTO.getMarcaId()));
        
        // Verificar se já existe modelo com o mesmo nome na mesma marca
        List<Modelo> modelosExistentes = modeloRepository.findByMarcaIdAndNomeContainingIgnoreCase(modeloDTO.getMarcaId(), modeloDTO.getNome());
        if (!modelosExistentes.isEmpty()) {
            throw new RuntimeException("Já existe um modelo com o nome '" + modeloDTO.getNome() + "' na marca selecionada");
        }
        
        Modelo modelo = new Modelo();
        modelo.setMarca(marca);
        modelo.setNome(modeloDTO.getNome());
        modelo.setValorFipe(modeloDTO.getValorFipe().doubleValue());
        modelo.setDataCriacao(LocalDateTime.now());
        modelo.setDataAtualizacao(LocalDateTime.now());
        
        Modelo modeloSalvo = modeloRepository.save(modelo);
        return converterParaDTO(modeloSalvo);
    }
    
    /**
     * Atualizar modelo existente
     */
    public ModeloDTO atualizar(Long id, ModeloDTO modeloDTO) {
        Modelo modelo = modeloRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Modelo não encontrado com ID: " + id));
        
        // Verificar se a marca existe
        Marca marca = marcaRepository.findById(modeloDTO.getMarcaId())
                .orElseThrow(() -> new RuntimeException("Marca não encontrada com ID: " + modeloDTO.getMarcaId()));
        
        // Verificar se o novo nome já existe na mesma marca
        List<Modelo> modelosExistentes = modeloRepository.findByMarcaIdAndNomeContainingIgnoreCase(modeloDTO.getMarcaId(), modeloDTO.getNome());
        boolean nomeExiste = modelosExistentes.stream()
                .anyMatch(m -> !m.getId().equals(id));
        if (nomeExiste) {
            throw new RuntimeException("Já existe um modelo com o nome '" + modeloDTO.getNome() + "' na marca selecionada");
        }
        
        modelo.setMarca(marca);
        modelo.setNome(modeloDTO.getNome());
        modelo.setValorFipe(modeloDTO.getValorFipe().doubleValue());
        modelo.setDataAtualizacao(LocalDateTime.now());
        
        Modelo modeloAtualizado = modeloRepository.save(modelo);
        return converterParaDTO(modeloAtualizado);
    }
    
    /**
     * Deletar modelo
     */
    public void deletar(Long id) {
        if (!modeloRepository.existsById(id)) {
            throw new RuntimeException("Modelo não encontrado com ID: " + id);
        }
        
        // Verificar se existem carros associados
        // TODO: Implementar verificação de dependências
        
        modeloRepository.deleteById(id);
    }
    
    /**
     * Verificar se modelo existe
     */
    @Transactional(readOnly = true)
    public boolean existePorId(Long id) {
        return modeloRepository.existsById(id);
    }
    
    /**
     * Converter Entity para DTO
     */
    private ModeloDTO converterParaDTO(Modelo modelo) {
        ModeloDTO dto = new ModeloDTO();
        dto.setId(modelo.getId());
        dto.setMarcaId(modelo.getMarca().getId());
        dto.setNomeMarca(modelo.getMarca().getNomeMarca());
        dto.setNome(modelo.getNome());
        dto.setValorFipe(java.math.BigDecimal.valueOf(modelo.getValorFipe()));
        dto.setDataCriacao(modelo.getDataCriacao());
        dto.setDataAtualizacao(modelo.getDataAtualizacao());
        return dto;
    }
}
