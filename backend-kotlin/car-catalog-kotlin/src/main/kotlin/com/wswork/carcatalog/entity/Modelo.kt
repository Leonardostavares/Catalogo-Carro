package com.wswork.carcatalog.kotlin.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "modelos")
data class Modelo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    
    @Column(name = "nome", nullable = false)
    val nome: String,
    
    @Column(name = "valor_fipe")
    val valorFipe: Double,
    
    @Column(name = "data_criacao")
    val dataCriacao: LocalDateTime = LocalDateTime.now(),
    
    @Column(name = "data_atualizacao")
    val dataAtualizacao: LocalDateTime = LocalDateTime.now(),
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "marca_id")
    val marca: Marca,
    
    @OneToMany(mappedBy = "modelo", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val carros: MutableList<Carro> = mutableListOf()
)
