import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { VoteSettingsService } from './vote-settings.service';

describe('VoteSettingsService', () => {
  let service: VoteSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(VoteSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
