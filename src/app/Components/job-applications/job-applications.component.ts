import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobApplicationService } from '../../services/job-application.service';
import { JobApplication } from '../../models/job-application.model';
import { NgForm, AbstractControl } from '@angular/forms';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-job-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.scss']
})
export class JobApplicationsComponent implements OnInit {
  updatingStatusIds = new Set<number>();
  editId: number | null = null;
  pageNumber = 1;
  pageSize = 10;
  totalPages = 5;
  editingJobCopy: JobApplication | null = null;
  showEditValidation = false;

  statusLabels: Record<number, string> = {
    0: 'Applied',
    1: 'Interview',
    2: 'Offer',
    3: 'Rejected'
  };

   statusOptions = [
    { value: 0, label: 'Applied' },
    { value: 1, label: 'Interview' },
    { value: 2, label: 'Offer' },
    { value: 3, label: 'Rejected' }
  ];

  newApplication: JobApplication = {
    id: 0,
    companyName: '',
    position: '',
    status: 1,
    dateApplied: new Date().toISOString().split('T')[0]
  };
jobApplications: JobApplication[] = [];
  

  constructor(private jobService: JobApplicationService) {}

  ngOnInit(): void {
  this.loadApplications();
}

loadApplications(): void {
  this.jobService.getAll(this.pageNumber, this.pageSize)
  .subscribe((data: JobApplication[]) => {
    this.jobApplications = data;
  });

}

changePage(page: number): void {
  this.pageNumber = page;
  this.loadApplications();
}

isFutureDate(dateStr: string): boolean {
  if (!dateStr) return false;

  const inputDate = new Date(dateStr);
  const today = new Date();

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return inputDate > today; 
}




startEdit(id: number) {
  this.editId = id;
  const job = this.jobApplications.find(j => j.id === id);
  if (job) {
    this.editingJobCopy = { ...job };
  }
}

cancelEdit() {
  this.editId = null;
  this.editingJobCopy = null; 
}


saveEdit(job: JobApplication, company: NgModel, position: NgModel, status: NgModel, date: NgModel) {
  this.showEditValidation = true;

  if (company.invalid || position.invalid || status.invalid || date.invalid) {
    company.control?.markAsTouched();
    position.control?.markAsTouched();
    status.control?.markAsTouched();
    date.control?.markAsTouched();
    return;
  }

  if (this.editingJobCopy) {
    Object.assign(job, this.editingJobCopy);

    this.jobService.update(job.id, job).subscribe(() => {
      this.editId = null;
      this.editingJobCopy = null;
      this.showEditValidation = false;
    });
  }
}


  addApplication(form: NgForm) {
  if (form.invalid) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
    return; 
  }

  const normalizeDate = (dateStr: string) => dateStr.split('T')[0];

  const duplicate = this.jobApplications.some(app => {
  

    const isDuplicate =
      app.companyName.toLowerCase().trim() === this.newApplication.companyName.toLowerCase().trim() &&
      app.position.toLowerCase().trim() === this.newApplication.position.toLowerCase().trim() &&
      normalizeDate(app.dateApplied) === normalizeDate(this.newApplication.dateApplied);

    console.log('Is duplicate:', isDuplicate);
    return isDuplicate;
  });

  if (duplicate) {
    alert('This job application already exists.');
    return;
  }

  this.newApplication.status = Number(this.newApplication.status);
  this.jobService.create(this.newApplication).subscribe(() => {
    this.loadApplications();
    this.resetForm();
    form.resetForm();
  });
}



 updateStatus(id: number, status: JobApplication['status']) {
  this.updatingStatusIds.add(id);

  const application = this.jobApplications.find(app => app.id === id);
  if (application) {
    const updatedApp = { ...application, status };

    this.jobService.update(id, updatedApp).subscribe({
      next: () => {
        this.loadApplications();
        this.updatingStatusIds.delete(id);
      },
      error: () => {
        console.error('Failed to update status.');
        this.updatingStatusIds.delete(id);
      }
    });
  } else {
    this.updatingStatusIds.delete(id);
  }
}



  resetForm() {
    this.newApplication = {
      id: 0,
      companyName: '',
      position: '',
      status: 1,
      dateApplied: new Date().toISOString().split('T')[0]
    };
  }
}