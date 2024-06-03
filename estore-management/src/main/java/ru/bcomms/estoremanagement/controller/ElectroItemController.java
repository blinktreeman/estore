package ru.bcomms.estoremanagement.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.bcomms.estoremanagement.entity.ElectroItem;
import ru.bcomms.estoremanagement.service.ElectroItemService;

@RestController
@RequestMapping(value = "/api/v1/electro-item")
public class ElectroItemController {

    private final ElectroItemService service;

    public ElectroItemController(ElectroItemService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ElectroItem> save(@RequestBody ElectroItem entity) {
        return new ResponseEntity<>(service.save(entity), HttpStatus.CREATED);
    }

    @PostMapping(value = "/save-all")
    public ResponseEntity<Iterable<ElectroItem>> saveAll(@RequestBody Iterable<ElectroItem> entityList) {
        return new ResponseEntity<>(service.saveAll(entityList), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ElectroItem> findById(@RequestParam(name = "id") Long id) {
        return service
                .findById(id)
                .map((value) -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/all-by-type-id")
    public ResponseEntity<Iterable<ElectroItem>> findAllByElectroTypeId(@RequestParam(name = "id") Long id) {
        return new ResponseEntity<>(service.findAllByElectroTypeId(id), HttpStatus.OK);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Iterable<ElectroItem>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ElectroItem> update(@RequestBody ElectroItem entity) {
        return service.update(entity)
                .map((value) -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteById(@RequestParam(name = "id") Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
