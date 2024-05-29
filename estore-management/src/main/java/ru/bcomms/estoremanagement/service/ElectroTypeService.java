package ru.bcomms.estoremanagement.service;

import org.springframework.stereotype.Service;
import ru.bcomms.estoremanagement.entity.ElectroType;
import ru.bcomms.estoremanagement.repository.ElectroTypeRepository;

@Service
public class ElectroTypeService extends CommonService<ElectroType, ElectroTypeRepository> {

    public ElectroTypeService(ElectroTypeRepository repository) {
        super(repository);
    }
}
