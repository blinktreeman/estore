package ru.bcomms.estoremanagement.service;

import org.springframework.stereotype.Service;
import ru.bcomms.estoremanagement.entity.PurchaseType;
import ru.bcomms.estoremanagement.repository.PurchaseTypeRepository;

@Service
public class PurchaseTypeService extends CommonService<PurchaseType, PurchaseTypeRepository> {

    public PurchaseTypeService(PurchaseTypeRepository repository) {
        super(repository);
    }
}
