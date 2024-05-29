package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "electro_type")
public class ElectroType implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private long id;

    /**
     * Наименование типа электроники
     */
    @Column(name = "name", nullable = false, length = 150)
    private String name;

    /**
     * Таблица «Тип электротовара-сотрудник»
     */
    @ManyToMany
    @JoinTable(
            name = "electro_employee",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "id")
    )
    private List<Employee> employees = new ArrayList<>();
}
