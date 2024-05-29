package ru.bcomms.estoremanagement.service;

import org.springframework.stereotype.Service;
import ru.bcomms.estoremanagement.entity.ElectroItem;
import ru.bcomms.estoremanagement.repository.ElectroItemRepository;

@Service
public class ElectroItemService extends CommonService<ElectroItem, ElectroItemRepository> {

    public ElectroItemService(ElectroItemRepository repository) {
        super(repository);
    }
}
