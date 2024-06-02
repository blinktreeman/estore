package ru.bcomms.estoremanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.bcomms.estoremanagement.entity.ElectroShop;
import ru.bcomms.estoremanagement.entity.ElectroShopPK;
import ru.bcomms.estoremanagement.repository.ElectroShopRepository;

import java.util.Optional;

@Service
public class ElectroShopService {

    private final ElectroShopRepository repository;

    @Autowired
    public ElectroShopService(ElectroShopRepository repository) {
        this.repository = repository;
    }

    // Данные по определенному товару для заданного магазина
    public Optional<ElectroShop> findElectroShopByElectroItemIdAndShopId(Long electroItemId, Long shopId) {
        return repository.findByElectroItemIdAndShopId(electroItemId, shopId);
    }

    // Коллекция данных по товарам для заданного магазина
    public Iterable<ElectroShop> findAllByShopId(Long shopId) {
        return repository.findAllByShopId(shopId);
    }

    // Коллекция данных магазинов с необходимым товаром
    public Iterable<ElectroShop> findAllByElectroItemId(Long electroItemId) {
        return repository.findAllByElectroItemId(electroItemId);
    }

    // CRUD operations

    public ElectroShop save(ElectroShop entity) {
        return repository.save(entity);
    }

    public Optional<ElectroShop> findByPK(ElectroShopPK pk) {
        return repository.findById(pk);
    }

    public Iterable<ElectroShop> findAll() {
        return repository.findAll();
    }

    public ElectroShop update(ElectroShop entity) {
        return repository.save(entity);
    }

    public void deleteByPK(ElectroShopPK pk) {
        repository.deleteById(pk);
    }
}
