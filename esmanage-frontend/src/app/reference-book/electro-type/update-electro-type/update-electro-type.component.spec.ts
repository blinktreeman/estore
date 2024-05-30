import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateElectroTypeComponent } from './update-electro-type.component';

describe('UpdateElectroTypeComponent', () => {
  let component: UpdateElectroTypeComponent;
  let fixture: ComponentFixture<UpdateElectroTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateElectroTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateElectroTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
