package ru.bcomms.estoremanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bcomms.estoremanagement.entity.ElectroShop;
import ru.bcomms.estoremanagement.entity.ElectroShopPK;

@Repository
public interface ElectroShopRepository extends JpaRepository<ElectroShop, ElectroShopPK> {
}
