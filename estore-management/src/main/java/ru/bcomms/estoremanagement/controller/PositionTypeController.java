package ru.bcomms.estoremanagement.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.bcomms.estoremanagement.entity.PositionType;
import ru.bcomms.estoremanagement.service.PositionTypeService;

@RestController
@RequestMapping(value = "/api/v1/position-type")
public class PositionTypeController {

    private final PositionTypeService service;

    public PositionTypeController(PositionTypeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PositionType> save(@RequestBody PositionType entity) {
        return new ResponseEntity<>(service.save(entity), HttpStatus.CREATED);
    }

    @PostMapping(value = "/save-all")
    public ResponseEntity<Iterable<PositionType>> saveAll(@RequestBody Iterable<PositionType> entityList) {
        return new ResponseEntity<>(service.saveAll(entityList), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<PositionType> findById(@RequestParam(name = "id") Long id) {
        return service
                .findById(id)
                .map((value) -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Iterable<PositionType>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<PositionType> update(@RequestBody PositionType entity) {
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
