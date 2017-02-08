/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PrintViewGeneratorService } from './print-view-generator.service';

describe('PrintViewGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrintViewGeneratorService]
    });
  });

  it('should ...', inject([PrintViewGeneratorService], (service: PrintViewGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
