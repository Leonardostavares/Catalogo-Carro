package com.wswork.carcatalog.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "carros")
public class Carro {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "carro_seq")
    @SequenceGenerator(name = "carro_seq", sequenceName = "carro_sequence", initialValue = 1000, allocationSize = 1)
    private Long id;
    
    @Column(name = "timestamp_cadastro")
    private Long timestampCadastro;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modelo_id", nullable = false)
    private Modelo modelo;
    
    @Column(name = "ano")
    private Integer ano;
    
    @Column(name = "combustivel")
    private String combustivel;
    
    @Column(name = "num_portas")
    private Integer numPortas;
    
    @Column(name = "cor")
    private String cor;
    
    @Column(name = "valor")
    private Double valor;
    
    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;
    
    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;
    
    // Construtores
    public Carro() {}
    
    public Carro(Modelo modelo, Integer ano, String combustivel, Integer numPortas, String cor, Double valor) {
        this.modelo = modelo;
        this.ano = ano;
        this.combustivel = combustivel;
        this.numPortas = numPortas;
        this.cor = cor;
        this.valor = valor;
        this.timestampCadastro = System.currentTimeMillis() / 1000; // Unix timestamp
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getTimestampCadastro() {
        return timestampCadastro;
    }
    
    public void setTimestampCadastro(Long timestampCadastro) {
        this.timestampCadastro = timestampCadastro;
    }
    
    public Modelo getModelo() {
        return modelo;
    }
    
    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }
    
    public Integer getAno() {
        return ano;
    }
    
    public void setAno(Integer ano) {
        this.ano = ano;
    }
    
    public String getCombustivel() {
        return combustivel;
    }
    
    public void setCombustivel(String combustivel) {
        this.combustivel = combustivel;
    }
    
    public Integer getNumPortas() {
        return numPortas;
    }
    
    public void setNumPortas(Integer numPortas) {
        this.numPortas = numPortas;
    }
    
    public String getCor() {
        return cor;
    }
    
    public void setCor(String cor) {
        this.cor = cor;
    }
    
    public Double getValor() {
        return valor;
    }
    
    public void setValor(Double valor) {
        this.valor = valor;
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
        if (timestampCadastro == null) {
            timestampCadastro = System.currentTimeMillis() / 1000;
        }
    }
    
    @PreUpdate
    protected void aoAtualizar() {
        dataAtualizacao = LocalDateTime.now();
    }
    
    @Override
    public String toString() {
        return "Carro{" +
                "id=" + id +
                ", timestampCadastro=" + timestampCadastro +
                ", modelo=" + (modelo != null ? modelo.getNome() : "null") +
                ", ano=" + ano +
                ", combustivel='" + combustivel + '\'' +
                ", numPortas=" + numPortas +
                ", cor='" + cor + '\'' +
                ", valor=" + valor +
                ", dataCriacao=" + dataCriacao +
                ", dataAtualizacao=" + dataAtualizacao +
                '}';
    }
}
