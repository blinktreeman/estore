package ru.bcomms.estoremanagement.service;

import org.springframework.stereotype.Service;
import ru.bcomms.estoremanagement.entity.Purchase;
import ru.bcomms.estoremanagement.repository.PurchaseRepository;

@Service
public class PurchaseService extends CommonService<Purchase, PurchaseRepository> {

    public PurchaseService(PurchaseRepository repository) {
        super(repository);
    }

    @Override
    public Purchase save(Purchase purchase) {
        Purchase savedPurchase = repository.save(purchase);
        // Update item count
        repository.updateElectroShopCount(savedPurchase.getShop().getId(),
                savedPurchase.getElectroItem().getId());
        repository.updateElectroItemCount(purchase.getElectroItem().getId());
        return savedPurchase;
    }
}
