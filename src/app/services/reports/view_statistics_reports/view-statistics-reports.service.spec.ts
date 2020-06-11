import { TestBed, inject } from '@angular/core/testing';

import { ViewStatisticsReportsService } from './view-statistics-reports.service';

describe('ViewStatisticsReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewStatisticsReportsService]
    });
  });

  it('should be created', inject([ViewStatisticsReportsService], (service: ViewStatisticsReportsService) => {
    expect(service).toBeTruthy();
  }));
});
