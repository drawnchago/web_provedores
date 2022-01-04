import { TestBed } from '@angular/core/testing';

import { mailService } from './mail.service';

describe('mailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: mailService = TestBed.get(mailService);
    expect(service).toBeTruthy();
  });
});
