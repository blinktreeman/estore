package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "electro_type")
public class ElectroType extends CommonEntity {
    @Serial
    private static final long serialVersionUID = 1L;

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
            joinColumns = @JoinColumn(name = "electro_type_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private List<Employee> employees = new ArrayList<>();
}
