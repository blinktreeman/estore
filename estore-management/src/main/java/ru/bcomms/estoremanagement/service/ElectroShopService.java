package ru.bcomms.estoremanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.bcomms.estoremanagement.repository.ElectroShopRepository;

@Service
public class ElectroShopService {

    private final ElectroShopRepository repository;

    @Autowired
    public ElectroShopService(ElectroShopRepository repository) {
        this.repository = repository;
    }

    // TODO: CRUD
}
