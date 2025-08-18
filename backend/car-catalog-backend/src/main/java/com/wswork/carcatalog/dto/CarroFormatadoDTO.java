package com.wswork.carcatalog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Integer valor; // Alterado para Integer para ficar igual ao exemplo
    private String marca; // Nome da marca conforme especificação do teste
}
