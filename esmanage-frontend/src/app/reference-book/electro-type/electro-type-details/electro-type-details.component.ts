import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ElectroType} from "../../../models/electroType";
import {ActivatedRoute, Router} from "@angular/router";
import {ElectroTypeService} from "../electro-type.service";

@Component({
  selector: 'app-electro-type-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './electro-type-details.component.html',
  styleUrl: './electro-type-details.component.css'
})
export class ElectroTypeDetailsComponent implements OnInit {

  id: bigint | undefined;
  electroType: ElectroType = new ElectroType();

  constructor(private service: ElectroTypeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getElectroTypeById(this.id).subscribe({
      next: value => {
        this.electroType = value;
      },
      error: err => console.log(err)
    });
  }

  updateElectroType() {
    this.service.updateElectroType(this.electroType).subscribe({
      next: value => {
        this.electroType = value;
      },
      error: err => console.log(err)
    });
  }

  deleteElectroType() {
    this.service.deleteElectroTypeById(this.electroType.id).subscribe({
      next: value => {
        this.router.navigate(['/electro-type-list']);
      },
      error: err => console.log(err)
    });
  }

}
