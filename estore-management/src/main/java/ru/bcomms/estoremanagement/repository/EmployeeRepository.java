package ru.bcomms.estoremanagement.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.bcomms.estoremanagement.entity.Employee;

@Repository
public interface EmployeeRepository extends CommonRepository<Employee> {

    @Query(value = "SELECT * FROM employee WHERE shop_id = :id",
            nativeQuery = true)
    Iterable<Employee> findAllByShopId(@Param(value = "id") Long id);
}
