export interface JobApplication {
  id: number;
  companyName: string;
  position: string;
  status: number;  
  dateApplied: string; 
}

export enum ApplicationStatus {
  Applied = 0,
  Interview = 1,
  Offer = 2,
  Rejected = 3
}