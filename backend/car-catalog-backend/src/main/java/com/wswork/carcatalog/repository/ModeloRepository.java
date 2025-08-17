package com.wswork.carcatalog.repository;

import com.wswork.carcatalog.entity.Marca;
import com.wswork.carcatalog.entity.Modelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModeloRepository extends JpaRepository<Modelo, Long> {
    
    // Buscar modelos por marca
    List<Modelo> findByMarcaId(Long marcaId);
    
    // Buscar modelo por nome
    List<Modelo> findByNomeContainingIgnoreCase(String nome);
    
    // Buscar modelo por marca e nome
    List<Modelo> findByMarcaIdAndNomeContainingIgnoreCase(Long marcaId, String nome);
    
    // Buscar modelo por marca e nome exato
    Optional<Modelo> findByNomeAndMarca(String nome, Marca marca);
}
