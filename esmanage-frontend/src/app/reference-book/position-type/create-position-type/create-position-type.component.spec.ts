import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePositionTypeComponent } from './create-position-type.component';

describe('CreatePositionTypeComponent', () => {
  let component: CreatePositionTypeComponent;
  let fixture: ComponentFixture<CreatePositionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePositionTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePositionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
