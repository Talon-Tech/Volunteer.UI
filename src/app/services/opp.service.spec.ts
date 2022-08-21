import { TestBed } from '@angular/core/testing';

import { OppService } from './opp.service';

describe('OppService', () => {
  let service: OppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
