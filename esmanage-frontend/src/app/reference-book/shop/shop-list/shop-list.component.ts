import {Component, OnInit} from '@angular/core';
import {Shop} from "../../../models/shop";
import {ShopService} from "../shop.service";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.css'
})
export class ShopListComponent implements OnInit {

  shopList: Shop[] | undefined;
  shop: Shop = new Shop();

  constructor(private service: ShopService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getShopList();
  }

  private getShopList() {
    this.service.getShopList().subscribe({
      next: value => {
        this.shopList = value;
      },
      error: err => console.log(err)
    });
  }

  shopDetails(id: bigint | undefined) {
    this.service.getShopById(id).subscribe({
      next: value => {
        this.router.navigate(['/shop-details', id]);
      },
      error: err => console.log(err)
    });
  }

  createShop() {
    this.service.createShop(this.shop).subscribe({
      next: value => {
        this.shopList?.push(value);
      },
      error: err => console.log(err)
    });
  }
}
