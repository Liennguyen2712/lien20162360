import { TestBed } from '@angular/core/testing';

import { KpiperiodconfigService } from './kpiperiodconfig.service';

describe('KpiperiodconfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KpiperiodconfigService = TestBed.get(KpiperiodconfigService);
    expect(service).toBeTruthy();
  });
});
