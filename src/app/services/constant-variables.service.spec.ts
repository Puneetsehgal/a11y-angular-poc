import { TestBed } from '@angular/core/testing';

import { ConstantVariablesService } from './constant-variables.service';

describe('ConstantVariablesService', () => {
  let service: ConstantVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstantVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
