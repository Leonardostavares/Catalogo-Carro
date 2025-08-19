package com.wswork.carcatalog.kotlin.dto

data class CarroDTO(
    val id: Long? = null,
    val timestampCadastro: Long = System.currentTimeMillis(),
    val modeloId: Long,
    val ano: Int,
    val combustivel: String,
    val numPortas: Int,
    val cor: String,
    val valor: Double,
    val dataCriacao: String? = null,
    val dataAtualizacao: String? = null
)
