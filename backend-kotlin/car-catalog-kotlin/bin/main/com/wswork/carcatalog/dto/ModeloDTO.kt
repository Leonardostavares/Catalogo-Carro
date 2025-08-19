package com.wswork.carcatalog.kotlin.dto

data class ModeloDTO(
    val id: Long? = null,
    val nome: String,
    val valorFipe: Double,
    val marcaId: Long,
    val dataCriacao: String? = null,
    val dataAtualizacao: String? = null
)
