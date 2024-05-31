import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PurchaseType} from "../../../models/purchaseType";
import {PurchaseTypeService} from "../purchase-type.service";

@Component({
  selector: 'app-purchase-type-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './purchase-type-details.component.html',
  styleUrl: './purchase-type-details.component.css'
})
export class PurchaseTypeDetailsComponent implements OnInit {

  id: bigint | undefined;
  purchaseType: PurchaseType = new PurchaseType();

  constructor(private service: PurchaseTypeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getPurchaseTypeById(this.id).subscribe({
      next: value => {
        this.purchaseType = value;
      },
      error: err => console.log(err)
    });
  }

  updatePurchaseType() {
    this.service.updatePurchaseType(this.purchaseType).subscribe({
      next: value => {
        this.purchaseType = value;
      },
      error: err => console.log(err)
    });
  }

  deletePurchaseType() {
    this.service.deletePurchaseTypeById(this.purchaseType.id).subscribe({
      next: value => {
        this.router.navigate(['/purchase-type-list']);
      },
      error: err => console.log(err)
    });
  }

}
