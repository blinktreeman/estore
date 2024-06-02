package ru.bcomms.estoremanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ElectroShopDto {

    private Long id;
    /**
     * Наименование магазина
     */
    private String name;
    /**
     * Адрес магазина
     */
    private String address;
    /**
     * Количество товара в данном магазине
     */
    private Integer count;
}
