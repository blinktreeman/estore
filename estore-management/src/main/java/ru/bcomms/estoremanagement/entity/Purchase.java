package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.bcomms.estoremanagement.dto.EmployeeWithSalesAmountDto;
import ru.bcomms.estoremanagement.dto.EmployeeWithSalesSumDto;

import java.io.Serial;
import java.util.Date;

@NamedNativeQuery(name = "Purchase.getEmployeesWithSalesAmount_Named",
        query = "SELECT e.last_name as lastName, e.first_name as firstName, e.patronymic, p.c as count " +
                "FROM employee AS e " +
                "LEFT OUTER JOIN " +
                    "(SELECT employee_id, COUNT(*) AS c " +
                    "FROM purchase " +
                    "WHERE purchase_date BETWEEN :from_date AND :to_date GROUP BY employee_id) AS p " +
                "ON e.id = p.employee_id " +
                "WHERE e.position_id = :position_type_id AND p.c > 0 " +
                "ORDER BY p.c DESC",
        resultSetMapping = "Mapping.EmployeeWithSalesAmountDto")
@SqlResultSetMapping(name = "Mapping.EmployeeWithSalesAmountDto",
        classes = @ConstructorResult(targetClass = EmployeeWithSalesAmountDto.class,
                columns = {
                        @ColumnResult(name = "lastName"),
                        @ColumnResult(name = "firstName"),
                        @ColumnResult(name = "patronymic"),
                        @ColumnResult(name = "count", type = Integer.class)
                }))

@NamedNativeQuery(name = "Purchase.getEmployeesWithSalesSum_Named",
        query = "SELECT e.last_name as lastName, e.first_name as firstName, e.patronymic, e_id_sum.s AS sum " +
                "FROM employee AS e " +
                "LEFT OUTER JOIN " +
                    "(SELECT p.employee_id, SUM(ei.price) AS s " +
                    "FROM purchase AS p " +
                    "LEFT OUTER JOIN electro_item AS ei ON p.electro_id = ei.id " +
                    "WHERE p.purchase_date BETWEEN :from_date AND :to_date " +
                    "GROUP BY p.employee_id) AS e_id_sum " +
                "ON e.id = e_id_sum.employee_id " +
                "WHERE e.position_id = :position_type_id AND e_id_sum.s > 0 " +
                "ORDER BY e_id_sum.s DESC",
        resultSetMapping = "Mapping.EmployeeWithSalesSumDto")
@SqlResultSetMapping(name = "Mapping.EmployeeWithSalesSumDto",
        classes = @ConstructorResult(targetClass = EmployeeWithSalesSumDto.class,
                columns = {
                        @ColumnResult(name = "lastName"),
                        @ColumnResult(name = "firstName"),
                        @ColumnResult(name = "patronymic"),
                        @ColumnResult(name = "sum", type = Integer.class)
                }))

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
    @Column(name = "purchase_date")
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
