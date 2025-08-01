# JobApplicationTracker

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.4.
Provides a user interface to add, update, and view job applications connected to the ASP.NET Core backend API.

# Features

- List all job applications in a paginated table
- Add new job applications via a form with validation
- Edit existing applications inline with validation
- Status dropdown for updating application status
- Communicates with backend API via Angular HttpClient
- Basic styling for usability and responsiveness

 # Validations

- Required fields: Company Name, Position, Date Applied, and Status must be filled before submitting.
- Date validation: Users cannot select future dates for the Date Applied field. Validation error is shown if violated.
- Inline edit validation: When editing a job application, the same validations apply. The save button is disabled or shows validation errors if inputs are invalid.
- Duplicate entries (same Company Name, Position, and Date Applied) are prevented on add.

  # Pagination

The job applications list supports pagination with pageNumber and pageSize.
Pagination controls (Previous, Next) allow navigating through pages.
The frontend sends these parameters to the backend API to fetch paginated data.
The table displays only the current page of job applications for better performance and usability.

# Assumptions

The backend API is running and accessible at the configured API URL.
CORS policy on the backend allows requests from localhost:4200.


# How to Run the Frontend

1. Prerequisites:
   - [Node.js](https://nodejs.org/) (LTS version recommended)  
   - Angular CLI installed globally:  
     ```bash
     npm install -g @angular/cli
     ```

2. Clone the repository: 
   ```bash
   git clone https://github.com/your-username/JobApplicationTracker.git
   npm install
   npm start
