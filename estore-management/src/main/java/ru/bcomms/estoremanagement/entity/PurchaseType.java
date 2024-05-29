package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
@Entity
@Table(name = "purchase_type")
public class PurchaseType implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private long id;

    /**
     * Наименование типа покупки
     */
    @Column(name = "name", nullable = false, length = 150)
    private String name;
}
