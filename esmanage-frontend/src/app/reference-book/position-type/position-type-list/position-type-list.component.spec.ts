import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionTypeListComponent } from './position-type-list.component';

describe('PositionTypeListComponent', () => {
  let component: PositionTypeListComponent;
  let fixture: ComponentFixture<PositionTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionTypeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PositionTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
