package com.wswork.carcatalog.kotlin.config

import com.wswork.carcatalog.entity.Carro
import com.wswork.carcatalog.entity.Marca
import com.wswork.carcatalog.entity.Modelo
import com.wswork.carcatalog.repository.CarroRepository
import com.wswork.carcatalog.repository.MarcaRepository
import com.wswork.carcatalog.repository.ModeloRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class DataInitializer(
    private val marcaRepository: MarcaRepository,
    private val modeloRepository: ModeloRepository,
    private val carroRepository: CarroRepository
) : CommandLineRunner {
    
    override fun run(vararg args: String?) {
        // Criar marcas
        val honda = marcaRepository.save(Marca(nomeMarca = "Honda"))
        val volkswagen = marcaRepository.save(Marca(nomeMarca = "Volkswagen"))
        val toyota = marcaRepository.save(Marca(nomeMarca = "Toyota"))
        val bmw = marcaRepository.save(Marca(nomeMarca = "BMW"))
        val audi = marcaRepository.save(Marca(nomeMarca = "Audi"))
        val chevrolet = marcaRepository.save(Marca(nomeMarca = "Chevrolet"))
        val mercedes = marcaRepository.save(Marca(nomeMarca = "Mercedes"))
        val hyundai = marcaRepository.save(Marca(nomeMarca = "Hyundai"))
        
        // Criar modelos
        val cityTouring = modeloRepository.save(Modelo(nome = "City Touring", valorFipe = 85000.0, marca = honda))
        val gol = modeloRepository.save(Modelo(nome = "Gol", valorFipe = 65000.0, marca = volkswagen))
        val accord = modeloRepository.save(Modelo(nome = "Accord", valorFipe = 180000.0, marca = honda))
        val x6 = modeloRepository.save(Modelo(nome = "X6", valorFipe = 450000.0, marca = bmw))
        val a4 = modeloRepository.save(Modelo(nome = "A4", valorFipe = 220000.0, marca = audi))
        val celta = modeloRepository.save(Modelo(nome = "Celta", valorFipe = 35000.0, marca = chevrolet))
        val gla = modeloRepository.save(Modelo(nome = "GLA", valorFipe = 280000.0, marca = mercedes))
        val corollaCross = modeloRepository.save(Modelo(nome = "Corolla Cross", valorFipe = 150000.0, marca = toyota))
        val hb20 = modeloRepository.save(Modelo(nome = "HB 20", valorFipe = 75000.0, marca = hyundai))
        
        // Criar carros
        carroRepository.save(Carro(
            timestampCadastro = System.currentTimeMillis(),
            ano = 2025,
            combustivel = "FLEX",
            numPortas = 4,
            cor = "PRETO",
            valor = 132850.0,
            modelo = cityTouring
        ))
        
        carroRepository.save(Carro(
            timestampCadastro = System.currentTimeMillis(),
            ano = 2024,
            combustivel = "FLEX",
            numPortas = 4,
            cor = "BRANCO",
            valor = 72000.0,
            modelo = gol
        ))
        
        carroRepository.save(Carro(
            timestampCadastro = System.currentTimeMillis(),
            ano = 2025,
            combustivel = "GASOLINA",
            numPortas = 4,
            cor = "PRATA",
            valor = 185000.0,
            modelo = accord
        ))
        
        carroRepository.save(Carro(
            timestampCadastro = System.currentTimeMillis(),
            ano = 2024,
            combustivel = "GASOLINA",
            numPortas = 5,
            cor = "AZUL",
            valor = 480000.0,
            modelo = x6
        ))
        
        carroRepository.save(Carro(
            timestampCadastro = System.currentTimeMillis(),
            ano = 2025,
            combustivel = "FLEX",
            numPortas = 4,
            cor = "CINZA",
            valor = 235000.0,
            modelo = a4
        ))
        
        carroRepository.save(Carro(
            timestampCadastro = System.currentTimeMillis(),
            ano = 2023,
            combustivel = "FLEX",
            numPortas = 4,
            cor = "VERMELHO",
            valor = 38000.0,
            modelo = celta
        ))
        
        carroRepository.save(Carro(
            timestampCadastro = System.currentTimeMillis(),
            ano = 2025,
            combustivel = "FLEX",
            numPortas = 5,
            cor = "BRANCO",
            valor = 295000.0,
            modelo = gla
        ))
        
        carroRepository.save(Carro(
            timestampCadastro = System.currentTimeMillis(),
            ano = 2024,
            combustivel = "FLEX",
            numPortas = 5,
            cor = "PRATA",
            valor = 158000.0,
            modelo = corollaCross
        ))
        
        carroRepository.save(Carro(
            timestampCadastro = System.currentTimeMillis(),
            ano = 2025,
            combustivel = "FLEX",
            numPortas = 4,
            cor = "PRETO",
            valor = 82000.0,
            modelo = hb20
        ))
        
        println("=== DADOS INICIALIZADOS COM SUCESSO ===")
        println("Marcas criadas: ${marcaRepository.count()}")
        println("Modelos criados: ${modeloRepository.count()}")
        println("Carros criados: ${carroRepository.count()}")
        println("=====================================")
    }
}
