/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SentinelDataService } from './sentinel-data.service';

describe('SentinelDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SentinelDataService]
    });
  });

  it('should ...', inject([SentinelDataService], (service: SentinelDataService) => {
    expect(service).toBeTruthy();
  }));
});
