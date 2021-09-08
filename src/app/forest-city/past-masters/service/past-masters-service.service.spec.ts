import { TestBed } from '@angular/core/testing';

import { PastMastersService } from './past-masters.service';

describe('PastMastersService', () => {
  let service: PastMastersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastMastersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
