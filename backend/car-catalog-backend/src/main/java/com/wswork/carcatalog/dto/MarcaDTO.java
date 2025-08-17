package com.wswork.carcatalog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO para transferência de dados de Marca
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarcaDTO {
    
    private Long id;
    
    @NotBlank(message = "Nome da marca é obrigatório")
    @Size(min = 2, max = 100, message = "Nome da marca deve ter entre 2 e 100 caracteres")
    private String nomeMarca;
    
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;
}
