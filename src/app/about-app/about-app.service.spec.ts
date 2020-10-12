import { TestBed } from '@angular/core/testing';

import { AboutAppService } from './about-app.service';

describe('AboutAppService', () => {
  let service: AboutAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
