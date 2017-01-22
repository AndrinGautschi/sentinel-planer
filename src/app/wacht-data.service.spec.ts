/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WachtDataService } from './wacht-data.service';

describe('WachtDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WachtDataService]
    });
  });

  it('should ...', inject([WachtDataService], (service: WachtDataService) => {
    expect(service).toBeTruthy();
  }));
});
