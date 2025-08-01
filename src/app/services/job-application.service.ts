// src/app/services/job-application.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../models/job-application.model';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  private apiUrl = 'http://localhost:5222/api/JobApplications'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

getAll(pageNumber: number = 1, pageSize: number = 10): Observable<JobApplication[]> {
  const url = `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return this.http.get<JobApplication[]>(url);
}


  getById(id: string): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.apiUrl}/${id}`);
  }

  create(application: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.apiUrl, application);
  }


update(id: number, application: Omit<JobApplication, 'id'>): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}`, application);
}

}
