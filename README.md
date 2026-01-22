# Assignment 3 - WebTech Backend

A Node.js web application built with Express.js that provides user authentication, profile management, and user listing functionality. This project demonstrates backend development concepts including MVC architecture, JWT authentication, password hashing, and database integration.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Design Decisions](#design-decisions)
- [License](#license)

## Features

- **User Registration**: Secure user registration with email validation and password hashing
- **User Authentication**: JWT-based login system with cookie support
- **Profile Management**: Authenticated users can view their profile information
- **User Listing**: Admin functionality to view all registered users
- **Error Handling**: Comprehensive error handling with custom 404 page
- **Logging**: Request logging middleware for debugging and monitoring
- **Security**: Password hashing with bcrypt, JWT tokens, input validation

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
- **Templating**: EJS (Embedded JavaScript)
- **Middleware**: Custom authentication validation, error handling, logging
- **Other**: Cookie-parser for session management

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)
- npm package manager

## Configuration

Create a `.env` file in the root directory with the following environment variables:

```env
# Server Configuration
PORT=your_port

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_db_username
DB_PASSWORD=your_db_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
```

## Database Setup

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE your_database_name;
   ```

2. Create the users table:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Running the Application

1. Ensure your PostgreSQL database is running and properly configured.

2. Start the server:
   ```bash
   node src/server.js
   ```

3. Open your browser and navigate to `http://localhost:your_port`

## API Documentation

### Public Routes

#### GET /
- **Description**: Renders the home page
- **Response**: HTML page

#### GET /register
- **Description**: Renders the registration form
- **Response**: HTML registration form

#### POST /register
- **Description**: Registers a new user
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Validation**:
  - Name, email, and password are required
  - Email must be in valid format
  - Password must be at least 8 characters
- **Response**: Redirects to login page on success, renders register page with error on failure

#### GET /login
- **Description**: Renders the login form
- **Response**: HTML login form

#### POST /login
- **Description**: Authenticates a user
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: Sets JWT cookie and redirects to profile on success, renders login page with error on failure

#### POST /logout
- **Description**: Logs out the current user
- **Response**: Clears JWT cookie and redirects to home

### Protected Routes (Require Authentication)

#### GET /profile
- **Description**: Displays the authenticated user's profile
- **Authentication**: JWT token (via cookie or Authorization header)
- **Response**: HTML profile page

#### GET /users
- **Description**: Lists all registered users
- **Authentication**: JWT token (via cookie or Authorization header)
- **Response**: HTML page with user list

### Error Handling

#### 404 Not Found
- **Description**: Custom 404 page for undefined routes
- **Response**: HTML 404 error page

## Project Structure

```
assignment-3/
├── src/
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── profileController.js   # Profile management
│   │   └── userController.js      # User operations
│   ├── middleware/
│   │   ├── authValidation.js      # Authentication middleware
│   │   ├── errorHandler.js        # Error handling middleware
│   │   └── logger.js              # Request logging
│   ├── repositories/
│   │   └── PostgreSQL/
│   │       └── postgreSQL.js      # Database connection and queries
│   ├── routes/
│   │   └── router.js              # Route definitions
│   ├── services/
│   │   └── userService.js         # Business logic layer
│   ├── views/                     # EJS templates
│   │   ├── index.ejs
│   │   ├── login.ejs
│   │   ├── register.ejs
│   │   ├── profile.ejs
│   │   ├── users.ejs
│   │   └── 404.ejs
│   ├── public/                    # Static assets
│   │   └── css/
│   │       └── style.css
│   └── server.js                  # Main application file
├── logs/                          # Log files
├── package.json
├── README.md
└── .env                           # Environment variables (not in repo)
```

## Design Decisions

### Architecture
- **MVC Pattern**: The application follows Model-View-Controller architecture for better organization and maintainability.
  - **Models**: Handled by repositories (PostgreSQL interactions)
  - **Views**: EJS templates for server-side rendering
  - **Controllers**: Handle HTTP requests and responses

### Authentication
- **JWT with Dual Support**: Supports both cookie-based and header-based JWT authentication for flexibility.
- **Password Security**: Uses bcrypt for password hashing with salt rounds of 10.
- **Session Management**: JWT tokens expire after 1 hour for security.

### Database
- **PostgreSQL**: Chosen for its robustness, ACID compliance, and advanced features.
- **Connection Pooling**: Uses pg.Pool for efficient database connection management.

### Error Handling
- **Middleware**: Centralized error handling with appropriate HTTP status codes.
- **User-Friendly Messages**: Errors are displayed to users through rendered pages rather than raw JSON.

### Security
- **Input Validation**: Server-side validation for all user inputs.
- **SQL Injection Prevention**: Uses parameterized queries in PostgreSQL.

### Development Practices
- **Modular Structure**: Code is organized into logical modules for better maintainability.
- **Environment Configuration**: Sensitive data is stored in environment variables.
- **Logging**: Request logging for debugging and monitoring purposes.

## License

This project is licensed under the ISC License.