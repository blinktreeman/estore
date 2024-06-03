package ru.bcomms.estoremanagement.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.bcomms.estoremanagement.entity.ElectroItem;

@Repository
public interface ElectroItemRepository extends CommonRepository<ElectroItem> {

    @Query(value = "SELECT * FROM electro_item WHERE etype_id = :id",
            nativeQuery = true)
    Iterable<ElectroItem> findAllByElectroTypeId(@Param(value = "id") Long id);
}
