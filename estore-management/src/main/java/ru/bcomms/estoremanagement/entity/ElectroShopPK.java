package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Embeddable
public class ElectroShopPK {
    /**
     * Идентификатор магазина - ссылка на идентификатор магазина справочника «Магазин»
     */
    @ManyToOne
    @JoinColumn(name = "shop_id", referencedColumnName = "id")
    private Shop shop;

    /**
     * Идентификатор электротовара – ссылка на идентификатор электротовара
     * реестра «Электротовары»
     */
    @ManyToOne
    @JoinColumn(name = "electro_item_id", referencedColumnName = "id")
    private ElectroItem electroItem;
}
