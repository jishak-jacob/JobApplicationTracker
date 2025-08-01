import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { JobApplicationsComponent } from './app/Components/job-applications/job-applications.component';

bootstrapApplication(JobApplicationsComponent, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));
