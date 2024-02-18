import { TestBed } from '@angular/core/testing';

import { QlkhService } from './qlkh.service';

describe('QlkhService', () => {
  let service: QlkhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QlkhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
