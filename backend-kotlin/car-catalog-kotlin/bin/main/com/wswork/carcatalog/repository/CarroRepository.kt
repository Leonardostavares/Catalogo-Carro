package com.wswork.carcatalog.kotlin.repository

import com.wswork.carcatalog.entity.Carro
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CarroRepository : JpaRepository<Carro, Long> {
    fun findByModeloId(modeloId: Long): List<Carro>
    fun findByAno(ano: Int): List<Carro>
    fun findByCombustivel(combustivel: String): List<Carro>
    fun findByCor(cor: String): List<Carro>
}
