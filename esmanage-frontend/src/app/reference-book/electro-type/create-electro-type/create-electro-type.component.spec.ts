import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateElectroTypeComponent } from './create-electro-type.component';

describe('CreateElectroTypeComponent', () => {
  let component: CreateElectroTypeComponent;
  let fixture: ComponentFixture<CreateElectroTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateElectroTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateElectroTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
