import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteElectroTypeComponent } from './delete-electro-type.component';

describe('DeleteElectroTypeComponent', () => {
  let component: DeleteElectroTypeComponent;
  let fixture: ComponentFixture<DeleteElectroTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteElectroTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteElectroTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
