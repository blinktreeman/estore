import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ElectroItem} from "../../models/electroItem";
import {ItemService} from "../item.service";
import {NgForOf, NgIf} from "@angular/common";
import {ElectroType} from "../../models/electroType";
import {ElectroShopDto} from "../../models/electroShopDto";
import {ElectroShop} from "../../models/electroShop";
import {ElectroShopPK} from "../../models/ElectroShopPK";

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {

  id: bigint | undefined;
  electroItem: ElectroItem = new ElectroItem();
  electroTypeList: ElectroType[] | undefined;
  shopDtoList: ElectroShopDto[] = [];
  protected readonly ElectroType = ElectroType;

  constructor(private service: ItemService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getElectroItemById(this.id).subscribe({
      next: value => {
        this.electroItem = value;
      },
      error: err => console.log(err)
    });
    this.getElectroTypeList();
    this.getShopListWithElectroItemCount();
  }

  private getShopListWithElectroItemCount() {
    this.service.getShopListWithElectroItemCount(this.id).subscribe({
      next: value => {
        this.shopDtoList = value;
      },
      error: err => console.log(err)
    });
  }

  // Получить типы товаров для выбора типа при создании нового товара
  private getElectroTypeList() {
    this.service.getElectroTypeList().subscribe({
      next: value => {
        this.electroTypeList = value;
      },
      error: err => console.log(err)
    });
  }

  onChangeType(electroType: ElectroType) {
    this.electroItem.electroType = electroType;
  }

  updateElectroItem() {
    this.service.updateElectroItem(this.electroItem).subscribe({
      next: value => {
        this.electroItem = value;
      },
      error: err => console.log(err)
    });
  }

  deleteElectroItem() {
    this.service.deleteElectroItemById(this.electroItem.id).subscribe({
      next: value => {
        this.router.navigate(['/item-list']);
      },
      error: err => console.log(err)
    });
  }

  addedAmount: number = 0;
  electroShop: ElectroShop = new ElectroShop();

  setElectroShop(shop: ElectroShopDto, count: number) {
    this.electroShop.electroShopPK = {
      shop: shop,
      electroItem: this.electroItem,
    };
    this.electroShop.count = count;
  }

  updateElectroShop() {
    if (this.electroShop.count == null) {
      this.electroShop.count = this.addedAmount;
    } else {
      this.electroShop.count += this.addedAmount;
    }
    this.service.updateElectroShop(this.electroShop).subscribe({
      next: value => {
        let findName = value.electroShopPK?.shop?.name;
        let index = this.shopDtoList.findIndex(s => s.name === findName);
        this.shopDtoList[index].count = value.count;
      },
      error: err => console.log(err)
    });

  }

}
