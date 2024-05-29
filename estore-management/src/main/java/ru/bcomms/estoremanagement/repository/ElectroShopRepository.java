package ru.bcomms.estoremanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.bcomms.estoremanagement.entity.ElectroShop;
import ru.bcomms.estoremanagement.entity.ElectroShopPK;

public interface ElectroShopRepository extends JpaRepository<ElectroShop, ElectroShopPK> {
}
