import { TestBed } from '@angular/core/testing';

import { LearningFactService } from './learning-fact.service';

describe('LearningFactService', () => {
  let service: LearningFactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningFactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
