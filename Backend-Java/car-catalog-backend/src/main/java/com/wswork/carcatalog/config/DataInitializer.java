package com.wswork.carcatalog.config;

import com.wswork.carcatalog.entity.Marca;
import com.wswork.carcatalog.entity.Modelo;
import com.wswork.carcatalog.repository.MarcaRepository;
import com.wswork.carcatalog.repository.ModeloRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

/**
 * Inicializador de dados para popular o banco com dados iniciais
 */
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final MarcaRepository marcaRepository;
    private final ModeloRepository modeloRepository;

    @Override
    public void run(String... args) throws Exception {
        // Verificar se já existem dados
        if (marcaRepository.count() == 0) {
            System.out.println("🚗 Inicializando dados do banco...");
            
            // Criar marcas
            List<Marca> marcas = Arrays.asList(
                new Marca("Toyota"),
                new Marca("Chevrolet"),
                new Marca("Volkswagen"),
                new Marca("Ford"),
                new Marca("Honda"),
                new Marca("Fiat"),
                new Marca("Hyundai"),
                new Marca("BMW"),
                new Marca("Mercedes-Benz"),
                new Marca("Audi")
            );
            
            marcaRepository.saveAll(marcas);
            System.out.println("✅ Marcas criadas: " + marcas.size());
            
            // Criar modelos
            List<Modelo> modelos = Arrays.asList(
                new Modelo(marcas.get(0), "Corolla"), // Toyota
                new Modelo(marcas.get(0), "Camry"),   // Toyota
                new Modelo(marcas.get(1), "Onix"),    // Chevrolet
                new Modelo(marcas.get(1), "Cruze"),   // Chevrolet
                new Modelo(marcas.get(2), "Golf"),    // Volkswagen
                new Modelo(marcas.get(2), "Jetta"),   // Volkswagen
                new Modelo(marcas.get(3), "Focus"),   // Ford
                new Modelo(marcas.get(3), "Fiesta"),  // Ford
                new Modelo(marcas.get(4), "Civic"),   // Honda
                new Modelo(marcas.get(4), "Accord")   // Honda
            );
            
            modeloRepository.saveAll(modelos);
            System.out.println("✅ Modelos criados: " + modelos.size());
            System.out.println("🚗 Dados inicializados com sucesso!");
        } else {
            System.out.println("✅ Banco já possui dados iniciais");
        }
    }
}
