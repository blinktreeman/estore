import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePurchaseTypeComponent } from './delete-purchase-type.component';

describe('DeletePurchaseTypeComponent', () => {
  let component: DeletePurchaseTypeComponent;
  let fixture: ComponentFixture<DeletePurchaseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePurchaseTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletePurchaseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
