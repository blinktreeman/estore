package ru.bcomms.estoremanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeeWithSalesSumDto {
    /**
     * Работник
     */
    private String lastName;
    private String firstName;
    private String patronymic;
    /**
     * Сумма продаж работника, руб
     */
    private Integer sum;
}
