import { TestBed } from '@angular/core/testing';

import { ListManagements } from './list-managements';

describe('ListManagements', () => {
  let service: ListManagements;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListManagements);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
