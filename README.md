# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

## Technologies Used

- **Node.js** – Runs the server.
- **Express.js** – Handles routes and API requests.
- **MongoDB** – Stores application data.
- **Mongoose** – Connects the application to MongoDB and manages schemas.
- **Validator.js** – Validates URL fields.
- **ESLint** – Helps maintain code quality and consistency.
- **Prettier** – Formats code automatically.
- **Nodemon** – Restarts the server automatically during development.
- **Postman** – Tests API endpoints.
- **Git & GitHub** – Version control and project management.

## Functionality

This backend API allows users to:

- Create and retrieve users
- Create and retrieve clothing items
- Delete clothing items
- Like and unlike clothing items
- Store data in MongoDB
- Handle errors with appropriate HTTP status codes
- Validate image and avatar URLs
