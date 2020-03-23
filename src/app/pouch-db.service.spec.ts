import { TestBed } from '@angular/core/testing';

import { PouchDBService } from './pouch-db.service';

describe('PouchDBService', () => {
  let service: PouchDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PouchDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
