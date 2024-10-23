# Medium API

# ![Node/Express/Mongoose Example App](project-logo.png)

> ### NestJS codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) API spec.

docs: https://amrrdev.github.io/medium-api-docs/
api: https://medium-production-11ab.up.railway.app/api/v1/articles/

A backend of the Medium platform, focused on articles, comments, tags, user authentication, and authorization. Built using **NestJS**, **PostgreSQL**, **TypeORM** and **JWT** for authentication. This API allows users to create articles, comment on them, manage tags, and handle profiles.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Sign Up, Sign In, JWT-based)
- Article Creation, Update, and Deletion
- Commenting System on Articles
- Tags for Articles
- User Profile Management
- Role-based access for certain routes (admin-only features)

## Technologies Used

- **Backend**: NestJS (Node.js framework)
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Platform**: Express (HTTP server handling)
- **ORM**: TypeORM (for database management)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/medium-clone-api.git
   cd medium-clone-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   - Create a `.env` file at the root of the project.
   - Add your PostgreSQL connection and JWT secret in the `.env` file.

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=yourusername
   DB_PASSWORD=yourpassword
   DB_NAME=medium_db
   JWT_SECRET=your_secret_key
   ```

## Environment Variables

Make sure you have these environment variables set in your `.env` file:

- `DB_HOST`: Your PostgreSQL host (e.g., `localhost`)
- `DB_PORT`: Your PostgreSQL port (usually `5432`)
- `DB_USERNAME`: Your PostgreSQL username
- `DB_PASSWORD`: Your PostgreSQL password
- `DB_NAME`: The name of your PostgreSQL database
- `JWT_SECRET`: The secret key for JWT authentication

## API Documentation

### Tags

| Method | Endpoint           | Description  |
| ------ | ------------------ | ------------ |
| GET    | `/api/v1/tags`     | Get All Tags |
| POST   | `/api/v1/tags`     | Create a Tag |
| DELETE | `/api/v1/tags/:id` | Delete a Tag |

### Auth

| Method | Endpoint                       | Description     |
| ------ | ------------------------------ | --------------- |
| POST   | `/api/v1/auth/sign-up`         | User Sign-Up    |
| POST   | `/api/v1/auth/sign-in`         | User Sign-In    |
| POST   | `/api/v1/auth/forget-password` | Forget Password |
| POST   | `/api/v1/auth/reset-password`  | Reset Password  |

### Users

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| GET    | `/api/v1/users/profile` | Get User Profile           |
| PATCH  | `/api/v1/users/profile` | Update User Profile        |
| GET    | `/api/v1/users`         | Get All Users (Admin Only) |

### Articles

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/api/v1/articles`     | Create an Article    |
| GET    | `/api/v1/articles`     | Get All Articles     |
| GET    | `/api/v1/articles/:id` | Get Article by ID    |
| PATCH  | `/api/v1/articles/:id` | Update Article by ID |
| DELETE | `/api/v1/articles/:id` | Delete Article by ID |
| GET    | `/api/v1/articles/me`  | Get My Articles      |

### Comments

| Method | Endpoint                        | Description                 |
| ------ | ------------------------------- | --------------------------- |
| POST   | `/api/v1/articles/comment`      | Create a Comment            |
| PATCH  | `/api/v1/articles/comment/:id`  | Update Comment              |
| DELETE | `/api/v1/articles/comment/:id`  | Delete Comment              |
| GET    | `/api/v1/articles/:id/comments` | Get All Comments on Article |

## Authentication

The application uses **JWT** (JSON Web Tokens) for secure authentication. Tokens are generated upon login and should be passed with each request requiring authentication as a `Bearer Token` in the `Authorization` header.

Example:

```bash
Authorization: Bearer <token>
```

## Running the Project

To run the API locally:

1. Run the PostgreSQL database locally or through Docker.
2. Start the development server:

   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or create a pull request if you'd like to improve the project.
