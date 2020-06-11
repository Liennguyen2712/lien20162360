import { TestBed } from '@angular/core/testing';

import { EventdiaryconfigService } from './eventdiaryconfig.service';

describe('EventdiaryconfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventdiaryconfigService = TestBed.get(EventdiaryconfigService);
    expect(service).toBeTruthy();
  });
});
