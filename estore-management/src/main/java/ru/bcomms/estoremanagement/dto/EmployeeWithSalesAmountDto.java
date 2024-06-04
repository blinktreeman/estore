package ru.bcomms.estoremanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeeWithSalesAmountDto {
    /**
     * Работник
     */
    private String lastName;
    private String firstName;
    private String patronymic;
    /**
     * Количество продаж работника
     */
    private Integer count;
}
