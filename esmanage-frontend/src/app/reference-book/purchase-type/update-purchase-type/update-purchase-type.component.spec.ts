import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePurchaseTypeComponent } from './update-purchase-type.component';

describe('UpdatePurchaseTypeComponent', () => {
  let component: UpdatePurchaseTypeComponent;
  let fixture: ComponentFixture<UpdatePurchaseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePurchaseTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePurchaseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
