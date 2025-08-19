package com.wswork.carcatalog.kotlin.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "carros")
data class Carro(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    
    @Column(name = "timestamp_cadastro")
    val timestampCadastro: Long = System.currentTimeMillis(),
    
    @Column(name = "ano", nullable = false)
    val ano: Int,
    
    @Column(name = "combustivel", nullable = false)
    val combustivel: String,
    
    @Column(name = "num_portas", nullable = false)
    val numPortas: Int,
    
    @Column(name = "cor", nullable = false)
    val cor: String,
    
    @Column(name = "valor")
    val valor: Double,
    
    @Column(name = "data_criacao")
    val dataCriacao: LocalDateTime = LocalDateTime.now(),
    
    @Column(name = "data_atualizacao")
    val dataAtualizacao: LocalDateTime = LocalDateTime.now(),
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modelo_id")
    val modelo: Modelo
)
