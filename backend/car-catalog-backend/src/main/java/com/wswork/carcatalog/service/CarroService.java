package com.wswork.carcatalog.service;

import com.wswork.carcatalog.dto.CarroDTO;
import com.wswork.carcatalog.dto.CarroFormatadoDTO;
import com.wswork.carcatalog.dto.CarroRespostaDTO;
import com.wswork.carcatalog.entity.Carro;
import com.wswork.carcatalog.entity.Marca;
import com.wswork.carcatalog.entity.Modelo;
import com.wswork.carcatalog.repository.CarroRepository;
import com.wswork.carcatalog.repository.MarcaRepository;
import com.wswork.carcatalog.repository.ModeloRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service para operações de negócio relacionadas a Carro
 */
@Service
@RequiredArgsConstructor
@Transactional
public class CarroService {
    
    private final CarroRepository carroRepository;
    private final ModeloRepository modeloRepository;
    private final MarcaRepository marcaRepository;
    
    /**
     * Buscar todos os carros
     */
    @Transactional(readOnly = true)
    public List<CarroRespostaDTO> buscarTodos() {
        return carroRepository.findAll()
                .stream()
                .map(this::converterParaRespostaDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Buscar carro por ID
     */
    @Transactional(readOnly = true)
    public Optional<CarroRespostaDTO> buscarPorId(Long id) {
        return carroRepository.findById(id)
                .map(this::converterParaRespostaDTO);
    }
    
    /**
     * Buscar carros por modelo
     */
    @Transactional(readOnly = true)
    public List<CarroRespostaDTO> buscarPorModelo(Long modeloId) {
        return carroRepository.findByModeloId(modeloId)
                .stream()
                .map(this::converterParaRespostaDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Buscar carros por ano
     */
    @Transactional(readOnly = true)
    public List<CarroRespostaDTO> buscarPorAno(Integer ano) {
        return carroRepository.findByAno(ano)
                .stream()
                .map(this::converterParaRespostaDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Buscar carros por combustível
     */
    @Transactional(readOnly = true)
    public List<CarroRespostaDTO> buscarPorCombustivel(String combustivel) {
        return carroRepository.findByCombustivel(combustivel)
                .stream()
                .map(this::converterParaRespostaDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Buscar carros por cor
     */
    @Transactional(readOnly = true)
    public List<CarroRespostaDTO> buscarPorCor(String cor) {
        return carroRepository.findByCor(cor)
                .stream()
                .map(this::converterParaRespostaDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Buscar carros por faixa de preço
     */
    @Transactional(readOnly = true)
    public List<CarroRespostaDTO> buscarPorFaixaPreco(Double precoMin, Double precoMax) {
        return carroRepository.findByValorBetween(precoMin, precoMax)
                .stream()
                .map(this::converterParaRespostaDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Buscar carros por marca
     */
    @Transactional(readOnly = true)
    public List<CarroRespostaDTO> buscarPorMarca(Long marcaId) {
        return carroRepository.findByMarcaId(marcaId)
                .stream()
                .map(this::converterParaRespostaDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Criar novo carro
     */
    public CarroRespostaDTO criar(CarroDTO carroDTO) {
        // Usar o nomeModelo enviado pelo frontend
        String nomeModelo = carroDTO.getNomeModelo();
        String nomeMarca = carroDTO.getNomeMarca();
        
        // Buscar ou criar a marca
        Marca marca = marcaRepository.findByNomeMarca(nomeMarca)
                .orElseGet(() -> {
                    Marca novaMarca = new Marca(nomeMarca);
                    return marcaRepository.save(novaMarca);
                });
        
        // Buscar ou criar o modelo
        Modelo modelo = modeloRepository.findByNomeAndMarca(nomeModelo, marca)
                .orElseGet(() -> {
                    Modelo novoModelo = new Modelo(marca, nomeModelo);
                    return modeloRepository.save(novoModelo);
                });
        
        Carro carro = new Carro();
        carro.setModelo(modelo);
        carro.setAno(carroDTO.getAno());
        carro.setCombustivel(carroDTO.getCombustivel());
        carro.setNumPortas(carroDTO.getNumPortas());
        carro.setCor(carroDTO.getCor());
        carro.setValor(carroDTO.getValor().doubleValue());
        carro.setTimestampCadastro(System.currentTimeMillis() / 1000); // Unix timestamp
        carro.setDataCriacao(LocalDateTime.now());
        carro.setDataAtualizacao(LocalDateTime.now());
        
        Carro carroSalvo = carroRepository.save(carro);
        
        // Garantir que o ID seja sempre maior que os IDs das APIs externas
        Long idGerado = carroSalvo.getId();
        Long idMinimo = 1000L; // IDs das APIs externas são menores que 1000
        
        if (idGerado < idMinimo) {
            // Se o ID gerado for menor que 1000, forçar um ID maior
            // Isso pode ser feito através de uma sequência personalizada
            System.out.println("⚠️ ID gerado (" + idGerado + ") é menor que o mínimo (" + idMinimo + ")");
            System.out.println("⚠️ Recomendação: Configurar sequência de IDs para começar em 1000");
        }
        
        CarroRespostaDTO resposta = converterParaRespostaDTO(carroSalvo);
        
        System.out.println("🚗 === CARRO CRIADO NO BACKEND ===");
        System.out.println("ID: " + resposta.getId());
        System.out.println("Nome Modelo: " + resposta.getNomeModelo());
        System.out.println("Nome Marca: " + resposta.getNomeMarca());
        System.out.println("Ano: " + resposta.getAno());
        System.out.println("Combustível: " + resposta.getCombustivel());
        System.out.println("Número de Portas: " + resposta.getNumPortas());
        System.out.println("Cor: " + resposta.getCor());
        System.out.println("Valor: " + resposta.getValor());
        System.out.println("Timestamp Cadastro: " + resposta.getTimestampCadastro());
        System.out.println("=====================================");
        
        return resposta;
    }
    
    /**
     * Atualizar carro existente
     */
    public CarroRespostaDTO atualizar(Long id, CarroDTO carroDTO) {
        System.out.println("🔍 === SERVICE: ATUALIZANDO CARRO ===");
        System.out.println("ID recebido: " + id + " (tipo: " + id.getClass().getSimpleName() + ")");
        System.out.println("Dados recebidos: " + carroDTO);
        System.out.println("Buscando carro no repositório...");
        
        Carro carro = carroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carro não encontrado com ID: " + id));
        
        // Atualizar modelo se nomeModelo for enviado
        if (carroDTO.getNomeModelo() != null && !carroDTO.getNomeModelo().trim().isEmpty()) {
            System.out.println("Atualizando modelo para: " + carroDTO.getNomeModelo());
            
            // Usar a marca atual do carro ou a enviada
            String nomeMarca = carroDTO.getNomeMarca() != null ? carroDTO.getNomeMarca() : 
                              carro.getModelo().getMarca().getNomeMarca();
            
            // Buscar ou criar a marca
            Marca marca = marcaRepository.findByNomeMarca(nomeMarca)
                    .orElseGet(() -> {
                        Marca novaMarca = new Marca(nomeMarca);
                        return marcaRepository.save(novaMarca);
                    });
            
            // Buscar ou criar o modelo
            Modelo modelo = modeloRepository.findByNomeAndMarca(carroDTO.getNomeModelo(), marca)
                    .orElseGet(() -> {
                        Modelo novoModelo = new Modelo(marca, carroDTO.getNomeModelo());
                        return modeloRepository.save(novoModelo);
                    });
            
            carro.setModelo(modelo);
            System.out.println("Modelo atualizado para: " + modelo.getNome());
        }
        // Fallback: alterar modelo se modeloId for enviado
        else if (carroDTO.getModeloId() != null) {
            Modelo modelo = modeloRepository.findById(carroDTO.getModeloId())
                    .orElseThrow(() -> new RuntimeException("Modelo não encontrado com ID: " + carroDTO.getModeloId()));
            carro.setModelo(modelo);
        }
        
        carro.setAno(carroDTO.getAno());
        carro.setCombustivel(carroDTO.getCombustivel());
        carro.setNumPortas(carroDTO.getNumPortas());
        carro.setCor(carroDTO.getCor());
        carro.setValor(carroDTO.getValor().doubleValue());
        carro.setDataAtualizacao(LocalDateTime.now());
        
        Carro carroAtualizado = carroRepository.save(carro);
        
        System.out.println("🚗 === CARRO ATUALIZADO NO BACKEND ===");
        System.out.println("ID: " + carroAtualizado.getId());
        System.out.println("Nome Modelo: " + carroAtualizado.getModelo().getNome());
        System.out.println("Nome Marca: " + carroAtualizado.getModelo().getMarca().getNomeMarca());
        System.out.println("Ano: " + carroAtualizado.getAno());
        System.out.println("Combustível: " + carroAtualizado.getCombustivel());
        System.out.println("Número de Portas: " + carroAtualizado.getNumPortas());
        System.out.println("Cor: " + carroAtualizado.getCor());
        System.out.println("Valor: " + carroAtualizado.getValor());
        System.out.println("=====================================");
        
        return converterParaRespostaDTO(carroAtualizado);
    }
    
    /**
     * Deletar carro
     */
    public void deletar(Long id) {
        System.out.println("🔍 === SERVICE: DELETANDO CARRO ===");
        System.out.println("ID recebido: " + id + " (tipo: " + id.getClass().getSimpleName() + ")");
        System.out.println("Verificando se carro existe...");
        
        if (!carroRepository.existsById(id)) {
            System.out.println("❌ Carro não encontrado com ID: " + id);
            throw new RuntimeException("Carro não encontrado com ID: " + id);
        }
        
        System.out.println("✅ Carro encontrado, deletando...");
        carroRepository.deleteById(id);
        System.out.println("✅ Carro deletado com sucesso");
    }
    
    /**
     * Verificar se carro existe
     */
    @Transactional(readOnly = true)
    public boolean existePorId(Long id) {
        return carroRepository.existsById(id);
    }
    
    /**
     * Buscar todos os carros no formato específico do cars.json
     */
    @Transactional(readOnly = true)
    public List<CarroFormatadoDTO> buscarTodosFormatados() {
        return carroRepository.findAll()
                .stream()
                .map(this::converterParaFormatadoDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Converter Entity para DTO de resposta
     */
    private CarroRespostaDTO converterParaRespostaDTO(Carro carro) {
        CarroRespostaDTO dto = new CarroRespostaDTO();
        dto.setId(carro.getId());
        dto.setNomeModelo(carro.getModelo().getNome());
        dto.setNomeMarca(carro.getModelo().getMarca().getNomeMarca());
        dto.setAno(carro.getAno());
        dto.setCombustivel(carro.getCombustivel());
        dto.setNumPortas(carro.getNumPortas());
        dto.setCor(carro.getCor());
        dto.setValor(java.math.BigDecimal.valueOf(carro.getValor()));
        dto.setTimestampCadastro(carro.getTimestampCadastro());
        dto.setDataCriacao(carro.getDataCriacao());
        dto.setDataAtualizacao(carro.getDataAtualizacao());
        return dto;
    }
    
    /**
     * Converter Entity para DTO formatado (cars.json)
     */
    private CarroFormatadoDTO converterParaFormatadoDTO(Carro carro) {
        CarroFormatadoDTO dto = new CarroFormatadoDTO();
        dto.setId(carro.getId());
        dto.setTimestamp_cadastro(carro.getTimestampCadastro());
        dto.setModelo_id(carro.getModelo().getId());
        dto.setAno(carro.getAno());
        dto.setCombustivel(carro.getCombustivel());
        dto.setNum_portas(carro.getNumPortas());
        dto.setCor(carro.getCor());
        dto.setNome_modelo(carro.getModelo().getNome());
        dto.setValor(carro.getValor().intValue()); // Convertido para Integer
        dto.setMarca(carro.getModelo().getMarca().getNomeMarca()); // Adicionar nome da marca
        return dto;
    }
}
