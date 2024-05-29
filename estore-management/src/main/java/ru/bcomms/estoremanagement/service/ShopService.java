package ru.bcomms.estoremanagement.service;

import org.springframework.stereotype.Service;
import ru.bcomms.estoremanagement.entity.Shop;
import ru.bcomms.estoremanagement.repository.ShopRepository;

@Service
public class ShopService extends CommonService<Shop, ShopRepository> {

    public ShopService(ShopRepository repository) {
        super(repository);
    }
}
