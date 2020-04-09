import { TestBed } from '@angular/core/testing';

import { FormFieldsService } from './form-fields.service';

describe('FormFieldsService', () => {
  let service: FormFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
