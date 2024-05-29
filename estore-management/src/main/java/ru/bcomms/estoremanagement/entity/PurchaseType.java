package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "purchase_type")
public class PurchaseType extends CommonEntity {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    /**
     * Наименование типа покупки
     */
    @Column(name = "name", nullable = false, length = 150)
    private String name;
}
