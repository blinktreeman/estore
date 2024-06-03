package ru.bcomms.estoremanagement.service;

import org.springframework.stereotype.Service;
import ru.bcomms.estoremanagement.dto.ElectroShopDto;
import ru.bcomms.estoremanagement.entity.Shop;
import ru.bcomms.estoremanagement.repository.ShopRepository;

import java.util.List;

@Service
public class ShopService extends CommonService<Shop, ShopRepository> {

    public ShopService(ShopRepository repository) {
        super(repository);
    }

    public List<ElectroShopDto> getAllWithElectroItemCount(Long electroItemId) {
        return super.repository.getAllWithElectroItemCount_Named(electroItemId);
    }
}
