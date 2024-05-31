import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseTypeDetailsComponent } from './purchase-type-details.component';

describe('PurchaseTypeDetailsComponent', () => {
  let component: PurchaseTypeDetailsComponent;
  let fixture: ComponentFixture<PurchaseTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseTypeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
