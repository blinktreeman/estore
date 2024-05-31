import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectroTypeDetailsComponent } from './electro-type-details.component';

describe('ElectroTypeDetailsComponent', () => {
  let component: ElectroTypeDetailsComponent;
  let fixture: ComponentFixture<ElectroTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectroTypeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectroTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
