package ru.bcomms.estoremanagement.service;

import org.springframework.stereotype.Service;
import ru.bcomms.estoremanagement.entity.Employee;
import ru.bcomms.estoremanagement.repository.EmployeeRepository;

@Service
public class EmployeeService extends CommonService<Employee, EmployeeRepository> {

    public EmployeeService(EmployeeRepository repository) {
        super(repository);
    }

    public Iterable<Employee> findAllByShopId(Long id) {
        return repository.findAllByShopId(id);
    }
}
