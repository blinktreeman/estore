package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Formula;

import java.io.Serial;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "electro_item")
public class ElectroItem extends CommonEntity {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * Название товара
     */
    @Column(name = "name", nullable = false, length = 150)
    private String name;

    /**
     * Тип товара – ссылка на идентификатор типа электроники справочника «Тип электроники»
     */
    @ManyToOne
    @JoinColumn(name = "etype_id")
    private ElectroType electroType;

    /**
     * Цена – указывается в рублях
     */
    @Column(name = "price", nullable = false)
    private long price;

    /**
     * Количество – целое число, указывающее на общее количество данного товара в магазинах
     */
    @Column(name = "count", nullable = false)
    @Formula("(SELECT SUM(count) FROM electro_shop AS es WHERE es.electro_item_id = id)")
    private int count;

    /**
     * Признак архивности товара – логическое значение: true – товара нет в наличии,
     * снят с продаж, false – товар в продаже
     */
    @Column(name = "archive", nullable = false)
    private boolean archive;

    /**
     * Описание товара
     */
    @Column(name = "description", nullable = false)
    private String description;
}
