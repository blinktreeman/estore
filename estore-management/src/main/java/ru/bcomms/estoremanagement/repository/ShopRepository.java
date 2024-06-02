package ru.bcomms.estoremanagement.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.bcomms.estoremanagement.dto.ElectroShopDto;
import ru.bcomms.estoremanagement.entity.Shop;

import java.util.List;

@Repository
public interface ShopRepository extends CommonRepository<Shop> {

    @Query(nativeQuery = true)
    List<ElectroShopDto> getAllWithElectroItemCount_Named(@Param(value = "id") Long id);
}
