package ru.bcomms.estoremanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.bcomms.estoremanagement.entity.ElectroShop;
import ru.bcomms.estoremanagement.entity.ElectroShopPK;
import ru.bcomms.estoremanagement.service.ElectroShopService;


@RestController
@RequestMapping(value = "/api/v1/electro-shop")
public class ElectroShopController {

    private final ElectroShopService service;

    @Autowired
    public ElectroShopController(ElectroShopService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ElectroShop> save(@RequestBody ElectroShop entity) {
        return new ResponseEntity<>(service.save(entity), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ElectroShop> findByPK(@RequestBody ElectroShopPK pk) {
        return service
                .findByPK(pk)
                .map((value) -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/shop-list-by-item")
    public ResponseEntity<Iterable<ElectroShop>> findAllByElectroItemId(@RequestParam(name = "id") Long id) {
        return new ResponseEntity<>(service.findAllByElectroItemId(id), HttpStatus.OK);
    }

    @GetMapping(value = "/item-list-by-shop")
    public ResponseEntity<Iterable<ElectroShop>> findAllByShopId(@RequestParam(name = "id") Long id) {
        return new ResponseEntity<>(service.findAllByShopId(id), HttpStatus.OK);
    }

    @GetMapping(value = "/electro-shop-by-shop-item")
    public ResponseEntity<ElectroShop> findElectroShopByElectroItemIdAndShopId(
            @RequestParam(name = "item-id") Long electroItemId,
            @RequestParam(name = "shop-id") Long shopId) {
        return service
                .findElectroShopByElectroItemIdAndShopId(electroItemId, shopId)
                .map((value) -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Iterable<ElectroShop>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ElectroShop> update(@RequestBody ElectroShop entity) {
        return new ResponseEntity<>(service.update(entity), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteByPK(@RequestBody ElectroShopPK pk) {
        service.deleteByPK(pk);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
