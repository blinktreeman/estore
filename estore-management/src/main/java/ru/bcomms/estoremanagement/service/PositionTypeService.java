package ru.bcomms.estoremanagement.service;

import org.springframework.stereotype.Service;
import ru.bcomms.estoremanagement.entity.PositionType;
import ru.bcomms.estoremanagement.repository.PositionTypeRepository;

@Service
public class PositionTypeService extends CommonService<PositionType, PositionTypeRepository> {

    public PositionTypeService(PositionTypeRepository repository) {
        super(repository);
    }
}
