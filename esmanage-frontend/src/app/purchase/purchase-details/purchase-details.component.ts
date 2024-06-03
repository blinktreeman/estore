import {Component, OnInit} from '@angular/core';
import {PurchaseService} from "../purchase.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Purchase} from "../../models/purchase";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-purchase-details',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    DatePipe
  ],
  templateUrl: './purchase-details.component.html',
  styleUrl: './purchase-details.component.css'
})
export class PurchaseDetailsComponent implements OnInit {

  id: bigint | undefined;
  purchase: Purchase = new Purchase();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getPurchaseById(this.id).subscribe({
      next: value => {
        this.purchase = value;
      },
      error: err => console.log(err)
    });
  }

  constructor(private service: PurchaseService,
              private router: Router,
              private route: ActivatedRoute) {
  }

}
