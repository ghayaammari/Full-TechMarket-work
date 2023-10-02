import { TestBed } from '@angular/core/testing';

import { MaselectionService } from './maselection.service';

describe('MaselectionService', () => {
  let service: MaselectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaselectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
