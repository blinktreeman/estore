import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePositionTypeComponent } from './delete-position-type.component';

describe('DeletePositionTypeComponent', () => {
  let component: DeletePositionTypeComponent;
  let fixture: ComponentFixture<DeletePositionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePositionTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletePositionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
