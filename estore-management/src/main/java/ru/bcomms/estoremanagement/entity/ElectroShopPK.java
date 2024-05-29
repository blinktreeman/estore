package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
@Embeddable
public class ElectroShopPK implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * Идентификатор магазина - ссылка на идентификатор магазина справочника «Магазин»
     */
    @ManyToOne
    @Column(name = "shop_id")
    private Shop shop;

    /**
     * Идентификатор электротовара – ссылка на идентификатор электротовара
     * реестра «Электротовары»
     */
    @ManyToOne
    @Column(name = "electro_item_id")
    private ElectroItem electroItem;
}
