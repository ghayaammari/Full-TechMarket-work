import { TestBed } from '@angular/core/testing';

import { Produit2Service } from './produit2.service';

describe('Produit2Service', () => {
  let service: Produit2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Produit2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
