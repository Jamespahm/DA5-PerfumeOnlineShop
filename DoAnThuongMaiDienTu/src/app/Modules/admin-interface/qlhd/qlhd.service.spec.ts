import { TestBed } from '@angular/core/testing';

import { QlhdService } from './qlhd.service';

describe('QlhdService', () => {
  let service: QlhdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QlhdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
