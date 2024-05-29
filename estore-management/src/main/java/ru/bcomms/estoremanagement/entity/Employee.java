package ru.bcomms.estoremanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "employee")
public class Employee extends CommonEntity {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * Фамилия сотрудника
     */
    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    /**
     * Имя сотрудника
     */
    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    /**
     * Отчество сотрудника
     */
    @Column(name = "patronymic", nullable = false, length = 100)
    private String patronymic;

    /**
     * Дата рождения сотрудника
     */
    @Column(name = "birth_date", nullable = false)
    private Date birthDate;

    /**
     * Должность сотрудника – ссылка на идентификатор должности
     * справочника «Должности»
     */
    @ManyToOne
    @JoinColumn(name = "position_id")
    private PositionType positionType;

    /**
     * Магазин, где работает сотрудник – ссылка на идентификатор
     * магазина в справочнике «Магазин»
     */
    @ManyToOne
    @JoinColumn(name = "shop_id")
    private Shop shop;

    /**
     * Пол сотрудника – логическое значение: true – мужской; false – женский
     */
    @Column(name = "gender", nullable = false)
    private boolean gender;
}
