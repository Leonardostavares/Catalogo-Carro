package com.wswork.carcatalog.kotlin.dto

data class CarroRespostaDTO(
    val id: Long,
    val nomeModelo: String,
    val nomeMarca: String,
    val ano: Int,
    val combustivel: String,
    val numPortas: Int,
    val cor: String,
    val valor: Double,
    val timestampCadastro: Long,
    val dataCriacao: String,
    val dataAtualizacao: String
)
