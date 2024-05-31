import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ElectroItem} from "../../models/electroItem";
import {ItemService} from "../item.service";
import {NgForOf, NgIf} from "@angular/common";
import {ElectroType} from "../../models/electroType";

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

  protected readonly ElectroType = ElectroType;
}
