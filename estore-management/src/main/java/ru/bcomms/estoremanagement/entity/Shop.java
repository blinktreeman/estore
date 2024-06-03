package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.bcomms.estoremanagement.dto.ElectroShopDto;

import java.io.Serial;

@NamedNativeQuery(name = "Shop.getAllWithElectroItemCount_Named",
        query = "SELECT s.*, es.count FROM shop AS s LEFT OUTER JOIN " +
                "(SELECT e.shop_id, e.count FROM electro_shop AS e WHERE e.electro_item_id = :id) as es " +
                "ON es.shop_id = s.id " +
                "ORDER BY s.id",
        resultSetMapping = "Mapping.ElectroShopDto")
@SqlResultSetMapping(name = "Mapping.ElectroShopDto",
        classes = @ConstructorResult(targetClass = ElectroShopDto.class,
                columns = {
                        @ColumnResult(name = "id"),
                        @ColumnResult(name = "name"),
                        @ColumnResult(name = "address"),
                        @ColumnResult(name = "count")
                }))

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "shop")
public class Shop extends CommonEntity {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

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
