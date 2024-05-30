import {Component, OnInit} from '@angular/core';
import {ShopService} from "../shop.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Shop} from "../../../models/shop";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-shop-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './shop-details.component.html',
  styleUrl: './shop-details.component.css'
})
export class ShopDetailsComponent implements OnInit {

  id: bigint | undefined;
  shop: Shop = new Shop();

  constructor(private service: ShopService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getShopById(this.id).subscribe({
      next: value => {
        this.shop = value;
      },
      error: err => console.log(err)
    });
  }

  updateShop() {
    this.service.updateShop(this.shop).subscribe({
      next: value => {
        this.shop = value;
      },
      error: err => console.log(err)
    });
  }

}
