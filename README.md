# Multi-User Step Form with Local Storage

## Overview
This project is a step form with validations for input fields, allowing storage of data for multiple users in local storage. It provides a seamless user experience for inputting and saving data for various users.

## Features
- **Step Form**: Users can input data through a step-by-step form, ensuring a structured and intuitive process.
- **Validation**: Input fields are validated to ensure the correctness of data entered by users.
- **Local Storage**: Data entered by users can be stored locally, allowing for retrieval and persistence across sessions.
- **Multiple Users**: Support for storing data for more than one user, enabling the management of multiple user profiles.

## Technologies Used
- HTML5
- CSS3
- JavaScript

## Getting Started
1. Clone the repository to your local machine.
2. Open the project directory in your preferred code editor.
3. Open the `index.html` file in a web browser to view the application.

## Usage
1. Fill in the step form fields with the required information for each user.
2. Ensure all validation criteria are met before proceeding to the next step.
3. Upon completion, click the "Save" button to store the data in local storage.
4. To view or edit saved data, reload the page to retrieve the stored information.

## Local Storage Structure
- Each user's data is stored as an object in local storage.
- The key for each user's data is generated dynamically based on their identifier (e.g., user ID or username).