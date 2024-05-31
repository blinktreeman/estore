import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PositionType} from "../../../models/positionType";
import {PositionTypeService} from "../position-type.service";

@Component({
  selector: 'app-position-type-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './position-type-details.component.html',
  styleUrl: './position-type-details.component.css'
})
export class PositionTypeDetailsComponent implements OnInit {

  id: bigint | undefined;
  positionType: PositionType = new PositionType();

  constructor(private service: PositionTypeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getPositionTypeById(this.id).subscribe({
      next: value => {
        this.positionType = value;
      },
      error: err => console.log(err)
    });
  }

  updatePositionType() {
    this.service.updatePositionType(this.positionType).subscribe({
      next: value => {
        this.positionType = value;
      },
      error: err => console.log(err)
    });
  }

  deletePositionType() {
    this.service.deletePositionTypeById(this.positionType.id).subscribe({
      next: value => {
        this.router.navigate(['/position-type-list']);
      },
      error: err => console.log(err)
    });
  }

}
