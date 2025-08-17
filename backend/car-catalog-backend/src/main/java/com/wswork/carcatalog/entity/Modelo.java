package com.wswork.carcatalog.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "modelos")
public class Modelo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "marca_id", nullable = false)
    private Marca marca;
    
    @Column(name = "nome", nullable = false)
    private String nome;
    
    @Column(name = "valor_fipe")
    private Double valorFipe;
    
    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;
    
    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;
    
    // Construtores
    public Modelo() {}
    
    public Modelo(Marca marca, String nome) {
        this.marca = marca;
        this.nome = nome;
    }
    
    public Modelo(Marca marca, String nome, Double valorFipe) {
        this.marca = marca;
        this.nome = nome;
        this.valorFipe = valorFipe;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Marca getMarca() {
        return marca;
    }
    
    public void setMarca(Marca marca) {
        this.marca = marca;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public Double getValorFipe() {
        return valorFipe;
    }
    
    public void setValorFipe(Double valorFipe) {
        this.valorFipe = valorFipe;
    }
    
    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }
    
    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
    
    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }
    
    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }
    
    // Callbacks JPA
    @PrePersist
    protected void aoCriar() {
        dataCriacao = LocalDateTime.now();
        dataAtualizacao = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void aoAtualizar() {
        dataAtualizacao = LocalDateTime.now();
    }
    
    @Override
    public String toString() {
        return "Modelo{" +
                "id=" + id +
                ", marca=" + (marca != null ? marca.getNomeMarca() : "null") +
                ", nome='" + nome + '\'' +
                ", valorFipe=" + valorFipe +
                ", dataCriacao=" + dataCriacao +
                ", dataAtualizacao=" + dataAtualizacao +
                '}';
    }
}
