package com.wswork.carcatalog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.DecimalMin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO para transferência de dados de Carro
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarroDTO {
    
    private Long id;
    
    private Long modeloId; // Opcional agora, pois usamos nomeModelo
    
    private String nomeModelo; // Nome do modelo para exibição
    private String nomeMarca;  // Nome da marca para exibição
    
    @NotNull(message = "Ano é obrigatório")
    @Min(value = 1900, message = "Ano deve ser maior ou igual a 1900")
    @Max(value = 2030, message = "Ano deve ser menor ou igual a 2030")
    private Integer ano;
    
    @NotBlank(message = "Combustível é obrigatório")
    private String combustivel;
    
    @NotNull(message = "Número de portas é obrigatório")
    @Min(value = 2, message = "Número de portas deve ser maior ou igual a 2")
    @Max(value = 5, message = "Número de portas deve ser menor ou igual a 5")
    private Integer numPortas;
    
    @NotBlank(message = "Cor é obrigatória")
    private String cor;
    
    @NotNull(message = "Valor é obrigatório")
    @DecimalMin(value = "0.01", message = "Valor deve ser maior que zero")
    private BigDecimal valor;
    
    private Long timestampCadastro;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;
}
