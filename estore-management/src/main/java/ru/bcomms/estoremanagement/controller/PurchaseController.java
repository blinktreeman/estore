package ru.bcomms.estoremanagement.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.bcomms.estoremanagement.dto.EmployeeWithSalesAmountDto;
import ru.bcomms.estoremanagement.dto.EmployeeWithSalesSumDto;
import ru.bcomms.estoremanagement.dto.StatRequest;
import ru.bcomms.estoremanagement.entity.Purchase;
import ru.bcomms.estoremanagement.service.PurchaseService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/purchase")
public class PurchaseController {

    private final PurchaseService service;

    public PurchaseController(PurchaseService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Purchase> save(@RequestBody Purchase entity) {
        return new ResponseEntity<>(service.save(entity), HttpStatus.CREATED);
    }

    @PostMapping(value = "/save-all")
    public ResponseEntity<Iterable<Purchase>> saveAll(@RequestBody Iterable<Purchase> entityList) {
        return new ResponseEntity<>(service.saveAll(entityList), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Purchase> findById(@RequestParam(name = "id") Long id) {
        return service
                .findById(id)
                .map((value) -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Iterable<Purchase>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PostMapping(value = "/amount-stat")
    public ResponseEntity<Iterable<EmployeeWithSalesAmountDto>> getAllEmployeesOrderedBySalesAmount(
            @RequestBody StatRequest request) {
        return new ResponseEntity<>(service.getAllEmployeesOrderedBySalesAmount(
                request.getPositionTypeId(),
                request.getFromDate(),
                request.getToDate()), HttpStatus.OK);
    }

    @PostMapping(value = "/sum-stat")
    public ResponseEntity<Iterable<EmployeeWithSalesSumDto>> getAllEmployeesOrderedBySalesSum(
            @RequestBody StatRequest request) {
        return new ResponseEntity<>(service.getAllEmployeesOrderedBySalesSum(
                request.getPositionTypeId(),
                request.getFromDate(),
                request.getToDate()), HttpStatus.OK);
    }

    // Получить сумму покупок для выбранных типов товара
    @PostMapping(value = "/sum-by-types")
    public ResponseEntity<Integer> getSumOfPurchaseByItemTypes(@RequestBody List<Long> itemTypeList) {
        return new ResponseEntity<>(service.getSumOfPurchaseByItemTypeList(itemTypeList), HttpStatus.OK);
    }

    // Получить количество покупок товара заданного типа ниже указанной цены
    @GetMapping(value = "amount-by-type")
    public ResponseEntity<Integer> getAmountOfPurchaseByItemTypeAndMaxPrice(
            @RequestParam(name = "id") Long itemTypeId,
            @RequestParam(name = "price") Integer maxPrice) {
        return new ResponseEntity<>(
                service.getAmountOfPurchaseByItemTypeAndMaxPrice(itemTypeId, maxPrice),
                HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Purchase> update(@RequestBody Purchase entity) {
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
