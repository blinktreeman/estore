package ru.bcomms.estoremanagement.service;

import org.springframework.data.domain.Sort;
import ru.bcomms.estoremanagement.entity.CommonEntity;
import ru.bcomms.estoremanagement.repository.CommonRepository;

import java.util.Optional;

public abstract class CommonService<E extends CommonEntity, R extends CommonRepository<E>> {
    protected final R repository;

    public CommonService(R repository) {
        this.repository = repository;
    }

    // CRUD operations

    public E save(E entity) {
        return repository.save(entity);
    }

    public Iterable<E> saveAll(Iterable<E> entityCollection) {
        return repository.saveAll(entityCollection);
    }

    public Optional<E> findById(Long id) {
        return repository.findById(id);
    }

    public Iterable<E> findAll() {
        return repository.findAll(Sort.by("id").ascending());
    }

    public Optional<E> update(E entity) {
        return repository
                .findById(entity.getId())
                .map((value) -> repository.save(entity));
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
