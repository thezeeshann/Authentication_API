# Authentication_API 
Complete Authentication API with JWT in Express

This project is an authentication API developed by thezeeshann. It provides functionality for <br>
user registration, login, and authentication using JSON Web Tokens (JWT).

### Features

```
. User registration: Allows users to create an account by providing their email and password.
. User login: Allows registered users to log in using their email and password.
. JWT-based authentication: Generates and verifies JWT tokens to authenticate API requests.
. Password hashing: Safely stores user passwords by hashing them before storing them in the database.
. Error handling: Provides detailed error messages for various scenarios.
```

### Installation

1. Clone the repository:
> git clone https://github.com/thezeeshann/Authentication_API.git

2. Install dependencies:
> cd Authentication_API
> npm install

3. Set up environment variables:

```
Create a .env file in the root directory.
Specify the following environment variables in the .env file:
PORT: The port number on which the server will run (default: 3000).
JWT_SECRET: A secret key used for JWT token generation and verification.
MONGODB_URI: The URI of your MongoDB database.
```

4. Start the server:
> npm start

### API Endpoints

```
POST /api/users/register: Register a new user.
POST /api/users/login: Log in with existing credentials and receive a JWT token.
GET /api/users/profile: Get the authenticated user's profile.
```
