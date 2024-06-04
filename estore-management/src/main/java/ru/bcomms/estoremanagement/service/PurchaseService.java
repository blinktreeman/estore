package ru.bcomms.estoremanagement.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.bcomms.estoremanagement.dto.EmployeeWithSalesAmountDto;
import ru.bcomms.estoremanagement.dto.EmployeeWithSalesSumDto;
import ru.bcomms.estoremanagement.entity.Purchase;
import ru.bcomms.estoremanagement.repository.PurchaseRepository;

import java.util.Date;
import java.util.List;

@Service
public class PurchaseService extends CommonService<Purchase, PurchaseRepository> {

    public PurchaseService(PurchaseRepository repository) {
        super(repository);
    }

    @Override
    public Purchase save(Purchase purchase) {
        Purchase savedPurchase = repository.save(purchase);
        // Update item count
        repository.updateElectroShopCount(savedPurchase.getShop().getId(),
                savedPurchase.getElectroItem().getId());
        repository.updateElectroItemCount(purchase.getElectroItem().getId());
        return savedPurchase;
    }

    @Override
    public List<Purchase> findAll() {
        return repository.findAll(Sort.by("purchaseDate").ascending());
    }

    // Получить список работников согласно заданной должности с количеством продаж за период
    public List<EmployeeWithSalesAmountDto> getAllEmployeesOrderedBySalesAmount(
            Long positionTypeId,
            Date fromDate,
            Date toDate) {
        return repository.getEmployeesWithSalesAmount_Named(positionTypeId, fromDate, toDate);
    }

    // Получить список работников согласно заданной должности с суммой продаж за период
    public List<EmployeeWithSalesSumDto> getAllEmployeesOrderedBySalesSum(
            Long positionTypeId,
            Date fromDate,
            Date toDate) {
        return repository.getEmployeesWithSalesSum_Named(positionTypeId, fromDate, toDate);
    }
}
