import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationsComponent } from './job-applications.component'

describe('JobApplications', () => {
  let component: JobApplicationsComponent;
  let fixture: ComponentFixture<JobApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
