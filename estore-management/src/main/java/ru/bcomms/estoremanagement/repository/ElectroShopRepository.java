package ru.bcomms.estoremanagement.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.bcomms.estoremanagement.entity.ElectroShop;
import ru.bcomms.estoremanagement.entity.ElectroShopPK;

import java.util.Optional;

@Repository
public interface ElectroShopRepository extends JpaRepository<ElectroShop, ElectroShopPK> {

    @Query(value = "SELECT * FROM electro_shop AS es " +
            "WHERE es.electro_item_id = :electroItemId AND es.shop_id = :shopId",
            nativeQuery = true)
    Optional<ElectroShop> findByElectroItemIdAndShopId(@Param("electroItemId") Long electroItemId,
                                                       @Param("shopId") Long shopId);

    @Query(value = "SELECT * FROM electro_shop AS es WHERE es.shop_id = :shopId",
            nativeQuery = true)
    Iterable<ElectroShop> findAllByShopId(@Param("shopId") Long shopId);

    @Query(value = "SELECT * FROM electro_shop AS es WHERE es.lectro_item_id = :electroItemId",
            nativeQuery = true)
    Iterable<ElectroShop> findAllByElectroItemId(@Param("electroItemId") Long electroItemId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE electro_item ei " +
            "SET count = (SELECT SUM(e.count) FROM electro_shop e WHERE e.electro_item_id = :id) " +
            "WHERE ei.id = :id",
            nativeQuery = true)
    void updateElectroItemCount(@Param(value = "id") Long id);
}
