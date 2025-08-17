package com.wswork.carcatalog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO para resposta de listagem de carros
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarroRespostaDTO {
    
    private Long id;
    private String nomeModelo;
    private String nomeMarca;
    private Integer ano;
    private String combustivel;
    private Integer numPortas;
    private String cor;
    private BigDecimal valor;
    private Long timestampCadastro;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;
}
