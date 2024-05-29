package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
@Entity
@Table(name = "position_type")
public class PositionType implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private long id;

    /**
     * Наименование должности
     */
    @Column(name = "name", nullable = false, length = 150)
    private String name;
}
