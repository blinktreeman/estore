import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShopComponent } from './delete-shop.component';

describe('DeleteShopComponent', () => {
  let component: DeleteShopComponent;
  let fixture: ComponentFixture<DeleteShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
