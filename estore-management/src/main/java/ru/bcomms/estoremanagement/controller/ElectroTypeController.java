package ru.bcomms.estoremanagement.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.bcomms.estoremanagement.entity.ElectroType;
import ru.bcomms.estoremanagement.service.ElectroTypeService;

@RestController
@RequestMapping(value = "/api/v1/electro-type")
public class ElectroTypeController {

    private final ElectroTypeService service;

    public ElectroTypeController(ElectroTypeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ElectroType> save(@RequestBody ElectroType entity) {
        return new ResponseEntity<>(service.save(entity), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ElectroType> findById(@RequestParam(name = "id") Long id) {
        return service
                .findById(id)
                .map((value) -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Iterable<ElectroType>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ElectroType> update(@RequestBody ElectroType entity) {
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
