import { TestBed } from '@angular/core/testing';

import { BdoperationsService } from './bdoperations.service';

describe('BdoperationsService', () => {
  let service: BdoperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdoperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
