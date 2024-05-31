import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ElectroType} from "../../../models/electroType";
import {Router} from "@angular/router";
import {ElectroTypeService} from "../electro-type.service";

@Component({
  selector: 'app-electro-type-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './electro-type-list.component.html',
  styleUrl: './electro-type-list.component.css'
})
export class ElectroTypeListComponent implements OnInit {

  electroTypeList: ElectroType[] | undefined;
  electroType: ElectroType = new ElectroType();

  constructor(private service: ElectroTypeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getElectroTypeList();
  }

  private getElectroTypeList() {
    this.service.getElectroTypeList().subscribe({
      next: value => {
        this.electroTypeList = value;
      },
      error: err => console.log(err)
    });
  }

  electroTypeDetails(id: bigint | undefined) {
    this.service.getElectroTypeById(id).subscribe({
      next: value => {
        this.router.navigate(['/electro-type-details', id]);
      },
      error: err => console.log(err)
    });
  }

  createElectroType() {
    this.service.createElectroType(this.electroType).subscribe({
      next: value => {
        this.electroTypeList?.push(value);
      },
      error: err => console.log(err)
    });
  }

}
