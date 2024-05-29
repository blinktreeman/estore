package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "position_type")
public class PositionType extends CommonEntity {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * Наименование должности
     */
    @Column(name = "name", nullable = false, length = 150)
    private String name;
}
