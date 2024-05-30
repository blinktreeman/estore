import { TestBed } from '@angular/core/testing';

import { ElectroTypeService } from './electro-type.service';

describe('ElectroTypeService', () => {
  let service: ElectroTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectroTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
