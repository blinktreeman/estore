package ru.bcomms.estoremanagement.repository;

import org.springframework.stereotype.Repository;
import ru.bcomms.estoremanagement.entity.Employee;

@Repository
public interface EmployeeRepository extends CommonRepository<Employee> {
}
