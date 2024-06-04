package ru.bcomms.estoremanagement.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.bcomms.estoremanagement.dto.EmployeeWithSalesAmountDto;
import ru.bcomms.estoremanagement.dto.EmployeeWithSalesSumDto;
import ru.bcomms.estoremanagement.entity.Purchase;

import java.util.Date;
import java.util.List;

@Repository
public interface PurchaseRepository extends CommonRepository<Purchase> {

    // Обновить количество товара в магазине при совершении покупки
    @Transactional
    @Modifying
    @Query(value = "UPDATE electro_shop " +
            "SET count = count - 1 " +
            "WHERE shop_id = :shop_id AND electro_item_id = :electro_item_id",
            nativeQuery = true)
    void updateElectroShopCount(@Param(value = "shop_id") Long shopId,
                                @Param(value = "electro_item_id") Long electroItemId);

    // Обновить общее количество товара
    @Transactional
    @Modifying
    @Query(value = "UPDATE electro_item ei " +
            "SET count = (SELECT SUM(e.count) FROM electro_shop e WHERE e.electro_item_id = :id) " +
            "WHERE ei.id = :id",
            nativeQuery = true)
    void updateElectroItemCount(@Param(value = "id") Long id);

    // Получить список работников согласно заданной должности с количеством продаж за период
    @Query(nativeQuery = true)
    List<EmployeeWithSalesAmountDto> getEmployeesWithSalesAmount_Named(
            @Param(value = "position_type_id") Long positionTypeId,
            @Param(value = "from_date") Date fromDate,
            @Param(value = "to_date") Date toDate);

    // Получить список работников согласно заданной должности с суммами продаж за период
    @Query(nativeQuery = true)
    List<EmployeeWithSalesSumDto> getEmployeesWithSalesSum_Named(
            @Param(value = "position_type_id") Long positionTypeId,
            @Param(value = "from_date") Date fromDate,
            @Param(value = "to_date") Date toDate);
}
