/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModesGeneratorService } from './modes-generator.service';

describe('ModesGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModesGeneratorService]
    });
  });

  it('should ...', inject([ModesGeneratorService], (service: ModesGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
