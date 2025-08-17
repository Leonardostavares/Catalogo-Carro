package com.wswork.carcatalog.repository;

import com.wswork.carcatalog.entity.Carro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarroRepository extends JpaRepository<Carro, Long> {
    
    // Buscar carros por modelo
    List<Carro> findByModeloId(Long modeloId);
    
    // Buscar carros por ano
    List<Carro> findByAno(Integer ano);
    
    // Buscar carros por combustível
    List<Carro> findByCombustivel(String combustivel);
    
    // Buscar carros por cor
    List<Carro> findByCor(String cor);
    
    // Buscar carros por faixa de preço
    List<Carro> findByValorBetween(Double valorMin, Double valorMax);
    
    // Buscar carros por marca (usando join)
    @Query("SELECT c FROM Carro c JOIN c.modelo m JOIN m.marca ma WHERE ma.id = :marcaId")
    List<Carro> findByMarcaId(Long marcaId);
    
    // Buscar carros ordenados por valor (mais caros primeiro)
    List<Carro> findAllByOrderByValorDesc();
    
    // Buscar carros ordenados por ano (mais novos primeiro)
    List<Carro> findAllByOrderByAnoDesc();
}
