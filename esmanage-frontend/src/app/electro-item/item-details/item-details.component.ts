import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ElectroItem} from "../../models/electroItem";
import {ItemService} from "../item.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {

  id: bigint | undefined;
  electroItem: ElectroItem = new ElectroItem();

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
        this.router.navigate(['/electro-item-list']);
      },
      error: err => console.log(err)
    });
  }

}
