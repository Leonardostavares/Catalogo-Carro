package com.wswork.carcatalog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.DecimalMin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO para transferência de dados de Modelo
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModeloDTO {
    
    private Long id;
    
    @NotNull(message = "ID da marca é obrigatório")
    private Long marcaId;
    
    private String nomeMarca; // Nome da marca para exibição
    
    @NotBlank(message = "Nome do modelo é obrigatório")
    @Size(min = 2, max = 100, message = "Nome do modelo deve ter entre 2 e 100 caracteres")
    private String nome;
    
    @NotNull(message = "Valor FIPE é obrigatório")
    @DecimalMin(value = "0.01", message = "Valor FIPE deve ser maior que zero")
    private BigDecimal valorFipe;
    
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;
}
