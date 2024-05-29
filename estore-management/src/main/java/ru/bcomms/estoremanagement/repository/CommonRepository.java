package ru.bcomms.estoremanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import ru.bcomms.estoremanagement.entity.CommonEntity;

@NoRepositoryBean
public interface CommonRepository <E extends CommonEntity> extends JpaRepository<E, Long> {
}
