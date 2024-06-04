package ru.bcomms.estoremanagement.dto;

import lombok.Data;

import java.util.Date;

@Data
public class StatRequest {
    // id должности
    private Long positionTypeId;
    private Date fromDate;
    private Date toDate;
}
