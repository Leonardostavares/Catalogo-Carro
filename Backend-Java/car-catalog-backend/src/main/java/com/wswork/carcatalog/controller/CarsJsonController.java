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

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CarsJsonController {
    
    private final CarroService carroService;
    
    @GetMapping(value = "/cars.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getCarsJson() {
        try {
            List<CarroFormatadoDTO> carrosFormatados = carroService.buscarTodosFormatados();
            Map<String, List<CarroFormatadoDTO>> resposta = new HashMap<>();
            resposta.put("cars", carrosFormatados);
            
            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            
            String jsonFormatado = mapper.writeValueAsString(resposta);
            
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(jsonFormatado);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
