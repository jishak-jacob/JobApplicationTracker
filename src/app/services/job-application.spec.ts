import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JobApplicationService } from './job-application.service';

describe('JobApplicationService', () => {
  let service: JobApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JobApplicationService,
        provideHttpClientTesting(), 
      ],
    });

    service = TestBed.inject(JobApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
