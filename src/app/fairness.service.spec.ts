/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FairnessService } from './fairness.service';

describe('FairnessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FairnessService]
    });
  });

  it('should ...', inject([FairnessService], (service: FairnessService) => {
    expect(service).toBeTruthy();
  }));
});
