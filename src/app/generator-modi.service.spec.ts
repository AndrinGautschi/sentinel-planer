/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeneratorModiService } from './generator-modi.service';

describe('GeneratorModiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneratorModiService]
    });
  });

  it('should ...', inject([GeneratorModiService], (service: GeneratorModiService) => {
    expect(service).toBeTruthy();
  }));
});
