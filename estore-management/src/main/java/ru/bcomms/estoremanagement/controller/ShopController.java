package ru.bcomms.estoremanagement.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.bcomms.estoremanagement.dto.ElectroShopDto;
import ru.bcomms.estoremanagement.entity.Shop;
import ru.bcomms.estoremanagement.service.ShopService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/shop")
public class ShopController {

    private final ShopService service;

    public ShopController(ShopService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Shop> save(@RequestBody Shop entity) {
        return new ResponseEntity<>(service.save(entity), HttpStatus.CREATED);
    }

    @PostMapping(value = "/save-all")
    public ResponseEntity<Iterable<Shop>> saveAll(@RequestBody Iterable<Shop> shopList) {
        return new ResponseEntity<>(service.saveAll(shopList), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Shop> findById(@RequestParam(name = "id") Long id) {
        return service
                .findById(id)
                .map((value) -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Получить список магазинов и количество заданного товара для каждого из них
    @GetMapping(value = "/all-with-item-count")
    public ResponseEntity<List<ElectroShopDto>> getAllWithElectroItemCount(
            @RequestParam(name = "item_id") Long electroItemId) {
        return new ResponseEntity<>(service.getAllWithElectroItemCount(electroItemId), HttpStatus.OK);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Iterable<Shop>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Shop> update(@RequestBody Shop entity) {
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
