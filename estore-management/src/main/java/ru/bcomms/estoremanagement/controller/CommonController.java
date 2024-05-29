package ru.bcomms.estoremanagement.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.bcomms.estoremanagement.entity.CommonEntity;
import ru.bcomms.estoremanagement.repository.CommonRepository;
import ru.bcomms.estoremanagement.service.CommonService;

public abstract class CommonController <E extends CommonEntity,
        R extends CommonRepository<E>,
        S extends CommonService<E, R>> {

    private final S service;

    protected CommonController(S service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<E> save(@RequestBody E entity) {
        return new ResponseEntity<>(service.save(entity), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<E> findById(@RequestParam(name = "id") Long id) {
        return service
                .findById(id)
                .map((value) -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Iterable<E>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<E> update(@RequestBody E entity) {
        return service
                .findById(entity.getId())
                .map((value) -> new ResponseEntity<>(service.save(value), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteById(@RequestParam(name = "id") Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
