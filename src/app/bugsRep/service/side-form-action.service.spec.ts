import { TestBed } from '@angular/core/testing';

import { SideFormActionService } from './side-form-action.service';

describe('SideFormActionService', () => {
  let service: SideFormActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideFormActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
