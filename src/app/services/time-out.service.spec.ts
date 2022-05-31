import { TestBed } from '@angular/core/testing';

import { TimeOutService } from './time-out.service';

describe('TimeOutService', () => {
  let service: TimeOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
