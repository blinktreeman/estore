import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PurchaseType} from "../../../models/purchaseType";
import {PurchaseTypeService} from "../purchase-type.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-purchase-type-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './purchase-type-list.component.html',
  styleUrl: './purchase-type-list.component.css'
})
export class PurchaseTypeListComponent implements OnInit {

  purchaseTypeList: PurchaseType[] | undefined;
  purchaseType: PurchaseType = new PurchaseType();

  constructor(private service: PurchaseTypeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPurchaseTypeList();
  }

  private getPurchaseTypeList() {
    this.service.getPurchaseTypeList().subscribe({
      next: value => {
        this.purchaseTypeList = value;
      },
      error: err => console.log(err)
    });
  }

  purchaseTypeDetails(id: bigint | undefined) {
    this.service.getPurchaseTypeById(id).subscribe({
      next: value => {
        this.router.navigate(['/purchase-type-details', id]);
      },
      error: err => console.log(err)
    });
  }

  createPurchaseType() {
    this.service.createPurchaseType(this.purchaseType).subscribe({
      next: value => {
        this.purchaseTypeList?.push(value);
      },
      error: err => console.log(err)
    });
  }
}
