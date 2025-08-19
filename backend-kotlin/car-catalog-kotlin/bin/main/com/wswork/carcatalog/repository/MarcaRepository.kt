package com.wswork.carcatalog.kotlin.repository

import com.wswork.carcatalog.entity.Marca
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MarcaRepository : JpaRepository<Marca, Long> {
    fun findByNomeMarca(nomeMarca: String): Marca?
    fun existsByNomeMarca(nomeMarca: String): Boolean
}
