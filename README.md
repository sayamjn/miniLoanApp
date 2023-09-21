Mini Loan App
Welcome to the Mini Loan App! This is a full-stack project developed for an internship opportunity. The Mini Loan App allows authenticated users to go through a loan application process, get loans approved, and submit weekly loan repayments. Below, you'll find all the information you need to run and use the app.

Table of Contents
Project Overview
Technical Requirements
Installation
Usage
API Documentation
CI/CD Pipeline
Contributing
Contact
Project Overview
Brief Documentation
The Mini Loan App is a full-stack web application developed for an internship project. It includes the following technologies and choices:

Frontend Framework: EJS
CSS Framework: vanila CSS/bootstrap
Responsiveness: The application is designed to work seamlessly on both desktop and mobile devices.
Clean Application Architecture: The codebase follows a clean and modular architecture.
CI/CD Pipeline: GitHub Actions is used for continuous integration and continuous deployment.
Application Features
The Mini Loan App offers the following features:

Loan Application: Authenticated users can submit loan requests, specifying the loan amount and term. All loans have a weekly repayment frequency.

Loan Approval: Admins have the authority to approve pending loan requests.

View Loans: Authenticated users can view their own loans. A policy check ensures that customers can only view their own loans.

Repayments: Users can submit weekly loan repayments. If the repayment amount is greater than or equal to the scheduled amount, the scheduled repayment changes its status to PAID. When all scheduled repayments for a loan are PAID, the loan itself becomes PAID automatically.

Technical Requirements
Must-Have
Language: You can use any language of your choice.
REST API: Build a fully functional REST API with minimal frontend.
Minimal Frontend: The frontend includes HTML5 forms with form validation, error handling, loading state indicators, and different pages/routes for various functionalities.
Installation
To install and run the Mini Loan App locally, follow these steps:

Clone this repository to your local machine.
Navigate to the project's root directory.
Backend (Node.js & Express)
Go to the backend directory.
Run npm install to install the required dependencies.
Configure environment variables (if necessary).
Run npm start or run nodemon to start the application.
Usage
Access the app by opening your web browser and navigating to http://localhost:3000 (or the appropriate URL if you've configured a different port).
Follow the app's user interface to create loans, view loan history, and make repayments.
API Documentation
The API documentation for the Mini Loan App can be found in the API Documentation file.

CI/CD Pipeline
The application utilizes GitHub Actions for continuous integration and continuous deployment. All changes pushed to the main branch are automatically tested and deployed to a staging environment.

Contributing
Contributions to the Mini Loan App are welcome! If you'd like to contribute, please follow the Contributing Guidelines.

Contact
If you have any questions or need further assistance, please feel free to reach out to us at:

Email: sayamjain0708@gmail.com
LinkedIn: Sayam Jain
We hope you enjoy using the Mini Loan App!