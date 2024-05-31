import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ElectroItem} from "../../models/electroItem";
import {ItemService} from "../item.service";
import {ElectroType} from "../../models/electroType";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {

  electroItemList: ElectroItem[] | undefined;
  electroItem: ElectroItem = new ElectroItem();
  electroTypeList: ElectroType[] | undefined;

  constructor(private service: ItemService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getItemList();
    this.getElectroTypeList();
  }

  private getItemList() {
    this.service.getElectroItemList().subscribe({
      next: value => {
        this.electroItemList = value;
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

  itemDetails(id: bigint | undefined) {
    this.service.getElectroItemById(id).subscribe({
      next: value => {
        this.router.navigate(['/item-details', id]);
      },
      error: err => console.log(err)
    });
  }

  createItem() {
    this.service.createElectroItem(this.electroItem).subscribe({
      next: value => {
        this.electroItemList?.push(value);
      },
      error: err => console.log(err)
    });
  }

  protected readonly ElectroType = ElectroType;
}
