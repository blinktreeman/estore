import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {PositionType} from "../../../models/positionType";
import {PositionTypeService} from "../position-type.service";

@Component({
  selector: 'app-position-type-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './position-type-list.component.html',
  styleUrl: './position-type-list.component.css'
})
export class PositionTypeListComponent implements OnInit {

  positionTypeList: PositionType[] | undefined;
  positionType: PositionType = new PositionType();

  constructor(private service: PositionTypeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPositionTypeList();
  }

  private getPositionTypeList() {
    this.service.getPositionTypeList().subscribe({
      next: value => {
        this.positionTypeList = value;
      },
      error: err => console.log(err)
    });
  }

  positionTypeDetails(id: bigint | undefined) {
    this.service.getPositionTypeById(id).subscribe({
      next: value => {
        this.router.navigate(['/position-type-details', id]);
      },
      error: err => console.log(err)
    });
  }

  createPositionType() {
    this.service.createPositionType(this.positionType).subscribe({
      next: value => {
        this.positionTypeList?.push(value);
      },
      error: err => console.log(err)
    });
  }
}
