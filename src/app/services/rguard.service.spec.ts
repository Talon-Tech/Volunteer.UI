import { TestBed } from '@angular/core/testing';

import { RguardService } from './rguard.service';

describe('RguardService', () => {
  let service: RguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
