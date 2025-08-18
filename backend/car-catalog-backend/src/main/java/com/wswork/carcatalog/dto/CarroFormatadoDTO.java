package com.wswork.carcatalog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO para retornar carros no formato específico do cars.json
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarroFormatadoDTO {
    
    private Long id;
    private Long timestamp_cadastro;
    private Long modelo_id;
    private Integer ano;
    private String combustivel;
    private Integer num_portas;
    private String cor;
    private String nome_modelo;
    private BigDecimal valor;
    private String marca; // Nome da marca conforme especificação do teste
}
