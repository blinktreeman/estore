package ru.bcomms.estoremanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
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
}
