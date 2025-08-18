package com.wswork.carcatalog.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.wswork.carcatalog.dto.CarroFormatadoDTO;
import com.wswork.carcatalog.service.CarroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller específico para o endpoint cars.json do teste da WS Work
 */
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CarsJsonController {
    
    private final CarroService carroService;
    
    /**
     * GET /cars.json - Endpoint específico para o teste da WS Work
     * Retorna carros no formato cars.json conforme especificação do teste
     * 
     * Formato esperado:
     * {
     *   "cars": [
     *     {
     *       "id": 1,
     *       "timestamp_cadastro": 1696539488,
     *       "modelo_id": 12,
     *       "ano": 2015,
     *       "combustivel": "FLEX",
     *       "num_portas": 4,
     *       "cor": "BEGE",
     *       "nome_modelo": "ONIX PLUS",
     *       "valor": 50,
     *       "marca": "Chevrolet"
     *     }
     *   ]
     * }
     */
    @GetMapping(value = "/cars.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getCarsJson() {
        try {
            List<CarroFormatadoDTO> carrosFormatados = carroService.buscarTodosFormatados();
            Map<String, List<CarroFormatadoDTO>> resposta = new HashMap<>();
            resposta.put("cars", carrosFormatados);
            
            // Configurar ObjectMapper para formatação bonita
            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            
            String jsonFormatado = mapper.writeValueAsString(resposta);
            
            System.out.println("🚗 === ENDPOINT CARS.JSON CHAMADO ===");
            System.out.println("URL: /cars.json");
            System.out.println("Total de carros: " + carrosFormatados.size());
            System.out.println("Formato: cars.json para teste WS Work");
            System.out.println("JSON formatado e organizado");
            System.out.println("=====================================");
            
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(jsonFormatado);
        } catch (Exception e) {
            System.out.println("🚨 ERRO NO ENDPOINT CARS.JSON: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
