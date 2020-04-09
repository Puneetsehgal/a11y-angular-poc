import { TestBed } from '@angular/core/testing';

import { MiniCartService } from './mini-cart.service';

describe('MiniCartService', () => {
  let service: MiniCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiniCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
