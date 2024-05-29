package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "purchase")
public class Purchase extends CommonEntity {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    /**
     * Идентификатор электротовара – ссылка на идентификатор электротовара
     * реестра «Электротовары»
     */
    @ManyToOne
    @JoinColumn(name = "electro_id")
    private ElectroItem electroItem;

    /**
     * Идентификатор сотрудника - ссылка на идентификатор сотрудника реестра «Сотрудники»
     */
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    /**
     * Дата/время совершения покупки – дата/время
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "purchase_date")
    @org.hibernate.annotations.CreationTimestamp
    private Date purchaseDate;

    /**
     * Тип покупки - ссылка на идентификатор типа покупки справочника «Тип покупки»
     */
    @ManyToOne
    @JoinColumn(name = "type_id")
    private PurchaseType purchaseType;

    /**
     * Идентификатор магазина, где был продан товар - ссылка на идентификатор
     * магазина в справочнике «Магазин»
     */
    @ManyToOne
    @JoinColumn(name = "shop_id")
    private Shop shop;
}
