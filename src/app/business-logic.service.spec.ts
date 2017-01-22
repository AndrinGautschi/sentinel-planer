/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BusinessLogicService } from './business-logic.service';

describe('BusinessLogicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessLogicService]
    });
  });

  it('should ...', inject([BusinessLogicService], (service: BusinessLogicService) => {
    expect(service).toBeTruthy();
  }));
});
