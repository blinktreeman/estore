import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionTypeDetailsComponent } from './position-type-details.component';

describe('PositionTypeDetailsComponent', () => {
  let component: PositionTypeDetailsComponent;
  let fixture: ComponentFixture<PositionTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionTypeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PositionTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
