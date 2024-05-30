import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePositionTypeComponent } from './update-position-type.component';

describe('UpdatePositionTypeComponent', () => {
  let component: UpdatePositionTypeComponent;
  let fixture: ComponentFixture<UpdatePositionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePositionTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePositionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
