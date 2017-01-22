/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanGeneratorService } from './plan-generator.service';

describe('PlanGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanGeneratorService]
    });
  });

  it('should ...', inject([PlanGeneratorService], (service: PlanGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
