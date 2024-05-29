package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "electro_shop")
public class ElectroShop {

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
