import { TestBed } from '@angular/core/testing';

import { ValidloginService } from './validlogin.service';

describe('ValidloginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidloginService = TestBed.get(ValidloginService);
    expect(service).toBeTruthy();
  });
});
