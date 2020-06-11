import { TestBed } from '@angular/core/testing';

import { EmpTransferService } from './emp-transfer.service';

describe('EmpTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpTransferService = TestBed.get(EmpTransferService);
    expect(service).toBeTruthy();
  });
});
