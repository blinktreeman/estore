package ru.bcomms.estoremanagement.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.bcomms.estoremanagement.entity.PurchaseType;
import ru.bcomms.estoremanagement.service.PurchaseTypeService;

@RestController
@RequestMapping(value = "/api/v1/purchase-type")
public class PurchaseTypeController {

    private final PurchaseTypeService service;

    public PurchaseTypeController(PurchaseTypeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PurchaseType> save(@RequestBody PurchaseType entity) {
        return new ResponseEntity<>(service.save(entity), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<PurchaseType> findById(@RequestParam(name = "id") Long id) {
        return service
                .findById(id)
                .map((value) -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Iterable<PurchaseType>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<PurchaseType> update(@RequestBody PurchaseType entity) {
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
