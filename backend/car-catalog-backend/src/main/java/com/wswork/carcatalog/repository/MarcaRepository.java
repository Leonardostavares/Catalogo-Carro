package com.wswork.carcatalog.repository;

import com.wswork.carcatalog.entity.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {
    
    // Buscar marca por nome
    Optional<Marca> findByNomeMarca(String nomeMarca);
    
    // Verificar se existe marca com o nome
    boolean existsByNomeMarca(String nomeMarca);
}
