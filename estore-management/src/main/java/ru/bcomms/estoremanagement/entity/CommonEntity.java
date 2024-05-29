package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

import java.io.Serializable;

@Data
@MappedSuperclass
public abstract class CommonEntity implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
}
