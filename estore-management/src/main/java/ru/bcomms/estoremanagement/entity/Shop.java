package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
@Entity
@Table(name = "shop")
public class Shop implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private long id;

    /**
     * Наименование магазина
     */
    @Column(name = "name", nullable = false, length = 150)
    private String name;

    /**
     * Адрес магазина
     */
    @Column(name = "address", nullable = false)
    private String address;
}
