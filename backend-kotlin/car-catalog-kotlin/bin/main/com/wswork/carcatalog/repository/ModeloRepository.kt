package com.wswork.carcatalog.kotlin.repository

import com.wswork.carcatalog.entity.Modelo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ModeloRepository : JpaRepository<Modelo, Long> {
    fun findByMarcaId(marcaId: Long): List<Modelo>
    fun findByNome(nome: String): Modelo?
    fun existsByNome(nome: String): Boolean
}
