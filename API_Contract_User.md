# User Service - API Contract (OpenAPI/Swagger Format)

## Base URL
`/api/users`

## Endpoints

### 1. Register a new user
**POST** `/register`
- **Description:** Creates a new user account.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Responses:**
  - `201 Created`: Returns user data and JWT token.
  - `400 Bad Request`: User already exists or invalid data.

### 2. Login User
**POST** `/login`
- **Description:** Authenticates a user and returns a token.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Responses:**
  - `200 OK`: Returns user data and JWT token.
  - `401 Unauthorized`: Invalid email or password.

### 3. Get User Profile
**GET** `/profile`
- **Description:** Retrieves the logged-in user's profile.
- **Headers:** `Authorization: Bearer <token>`
- **Responses:**
  - `200 OK`: Returns user profile data.
  - `401 Unauthorized`: Not authorized, no token.

### 4. Update User Profile
**PUT** `/profile`
- **Description:** Updates the logged-in user's profile information.
- **Headers:** `Authorization: Bearer <token>`
- **Responses:**
  - `200 OK`: Profile successfully updated.

### 5. Get All Users (Admin)
**GET** `/`
- **Description:** Retrieves all registered users in the system.
- **Headers:** `Authorization: Bearer <token>` (Admin only)
- **Responses:**
  - `200 OK`: List of users.
  - `403 Forbidden`: User is not an admin.
