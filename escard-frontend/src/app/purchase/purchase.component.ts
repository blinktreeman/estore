import {Component, OnInit} from '@angular/core';
import {PurchaseService} from "./purchase.service";
import {ElectroType} from "../models/electroType";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PositionType} from "../models/positionType";

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit {

  constructor(private service: PurchaseService) {
  }

  ngOnInit(): void {
    this.getElectroTypeList();
  }

  electroTypeList: ElectroType[] = [];

  private getElectroTypeList() {
    this.service.getElectroTypeList().subscribe({
      next: value => {
        this.electroTypeList = value;
      },
      error: err => console.log(err)
    });
  }

  getStatistic() {
    console.log(this.electroTypeList);
    let checkedItems: number[] = [];
    this.electroTypeList.forEach(e => {
      if (e.checked && e.id != null) {
        checkedItems.push(e.id);
      }
    });
    this.service.getPurchaseSum(checkedItems).subscribe({
      next: value => {
        console.log(value);
      },
      error: err => console.log(err)
    });
  }

  selectedElectroType: ElectroType = new ElectroType();
  protected readonly ElectroType = ElectroType;
  maxPrice: number = 0;
  amount: number = 0;

  onChangeType(electroType: ElectroType) {
    this.selectedElectroType = electroType;
  }

  getAmountStatistic() {
    this.service.getPurchaseAmount(this.selectedElectroType.id, this.maxPrice).subscribe({
      next: value => {
        this.amount = value;
      },
      error: err => console.log(err)
    });
  }
}
