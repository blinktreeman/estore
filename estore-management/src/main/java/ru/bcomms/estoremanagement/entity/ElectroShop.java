package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
@Entity
@Table(name = "electro_shop")
public class ElectroShop implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * Составной первичный ключ
     */
    @EmbeddedId
    private ElectroShopPK electroShopPK;

    /**
     * Количество - целое число, указывающее на количество данного товара
     * в определенном магазине
     */
    @Column(name = "count")
    private int count;
}
