package com.wswork.carcatalog.kotlin.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "marcas")
data class Marca(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    
    @Column(name = "nome_marca", nullable = false, unique = true)
    val nomeMarca: String,
    
    @Column(name = "data_criacao")
    val dataCriacao: LocalDateTime = LocalDateTime.now(),
    
    @Column(name = "data_atualizacao")
    val dataAtualizacao: LocalDateTime = LocalDateTime.now(),
    
    @OneToMany(mappedBy = "marca", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val modelos: MutableList<Modelo> = mutableListOf()
)
