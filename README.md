# NestAuth — Authentication & RBAC API

A modular authentication and task-management REST API built with **NestJS** and **TypeScript**. The project demonstrates secure authentication, JWT-based authorization, role-based access control, email verification, password recovery, and user-owned task management.

## Features

### Authentication

* User registration and login
* Bcrypt password hashing
* Email verification through transactional email
* Verification-token expiration
* Forgot-password and password-reset flows
* JWT access tokens
* Refresh tokens with database-backed storage
* Refresh-token rotation
* HttpOnly refresh-token cookies
* Logout and refresh-token invalidation
* Protected authentication endpoints

### Authorization

* Global JWT authentication guard
* Role-based access control using `user` and `admin` roles
* Custom decorators:

  * `@Public()`
  * `@CurrentUser()`
  * `@Roles()`
* Admin-only user-management endpoints
* User ownership checks for task operations

### Task Management

Authenticated users can:

* Create tasks
* View their own tasks
* Update their own tasks
* Delete their own tasks

Task operations are restricted by the authenticated user's ID to prevent users from accessing or modifying other users' tasks.

### API and Developer Experience

* PostgreSQL database
* Neon Serverless PostgreSQL
* Drizzle ORM
* Type-safe database queries
* DTO-based request validation
* `class-validator` integration
* Global validation pipe
* Global HTTP exception filter
* Request throttling for sensitive endpoints
* Swagger/OpenAPI documentation

## Tech Stack

* **Backend:** NestJS, TypeScript
* **Database:** PostgreSQL, Neon
* **ORM:** Drizzle ORM
* **Authentication:** JWT, bcrypt
* **Email:** Resend
* **Validation:** class-validator, class-transformer
* **API Documentation:** Swagger/OpenAPI
* **Package Manager:** pnpm

## Project Structure

```text
src/
├── admin/
│   ├── admin.controller.ts
│   └── admin.module.ts
│
├── auth/
│   ├── dto/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── email.service.ts
│
├── common/
│   ├── decorators/
│   ├── filters/
│   └── guards/
│
├── db/
│   ├── index.ts
│   └── schema.ts
│
├── tasks/
│   ├── dto/
│   ├── tasks.controller.ts
│   ├── tasks.module.ts
│   └── tasks.service.ts
│
├── users/
│   ├── users.module.ts
│   └── users.service.ts
│
├── app.module.ts
└── main.ts
```

## Application Architecture

```text
Client
  │
  ▼
NestJS Controllers
  │
  ▼
Validation Pipes
  │
  ▼
Authentication and Authorization Guards
  │
  ▼
Feature Services
  │
  ▼
Drizzle ORM
  │
  ▼
Neon PostgreSQL
```

The application is organized into feature modules so that authentication, users, tasks, and administration remain separated and maintainable.

## Authentication Flow

### Registration

```text
Client submits registration details
        ↓
Validate request DTO
        ↓
Check whether email already exists
        ↓
Hash password with bcrypt
        ↓
Create verification token
        ↓
Save user in PostgreSQL
        ↓
Send verification email
```

### Email Verification

```text
User opens verification link
        ↓
Validate verification token
        ↓
Check token expiration
        ↓
Mark email as verified
        ↓
Clear verification token
        ↓
Generate access and refresh tokens
        ↓
Set refresh token in an HttpOnly cookie
```

### Protected Request

```text
Client sends access token
        ↓
JwtAuthGuard extracts Bearer token
        ↓
Verify JWT signature and expiration
        ↓
Load user from database
        ↓
Attach user to request.user
        ↓
Allow controller execution
```

## API Endpoints

### Authentication

| Method | Endpoint                    | Description                    |
| ------ | --------------------------- | ------------------------------ |
| `POST` | `/api/auth/register`        | Register a new user            |
| `GET`  | `/api/auth/verify-email`    | Verify a user's email          |
| `POST` | `/api/auth/login`           | Log in with email and password |
| `POST` | `/api/auth/refresh`         | Refresh access token           |
| `POST` | `/api/auth/logout`          | Log out the current user       |
| `GET`  | `/api/auth/me`              | Get the authenticated user     |
| `POST` | `/api/auth/forgot-password` | Request a password-reset email |
| `POST` | `/api/auth/reset-password`  | Reset a user's password        |

### Tasks

| Method   | Endpoint         | Description                  |
| -------- | ---------------- | ---------------------------- |
| `POST`   | `/api/tasks`     | Create a task                |
| `GET`    | `/api/tasks`     | Get the current user's tasks |
| `PATCH`  | `/api/tasks/:id` | Update an owned task         |
| `DELETE` | `/api/tasks/:id` | Delete an owned task         |

### Admin

| Method   | Endpoint               | Description                        |
| -------- | ---------------------- | ---------------------------------- |
| `GET`    | `/api/admin/users`     | Retrieve users as an administrator |
| `DELETE` | `/api/admin/users/:id` | Delete a user as an administrator  |

> The exact request bodies and response schemas are available through the Swagger documentation.

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* pnpm
* A Neon PostgreSQL database
* A Resend account and API key

### Installation

```bash
git clone https://github.com/withsarath/nest-auth-api.git
cd nest-auth
pnpm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=your_neon_database_url

JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

RESEND_API_KEY=your_resend_api_key

APP_URL=http://localhost:3000
PORT=3000
NODE_ENV=development
```

### Database Commands

```bash
pnpm db:push
```

Push the current Drizzle schema to the database.

```bash
pnpm db:generate
```

Generate database migration files.

```bash
pnpm db:migrate
```

Apply generated migrations.

```bash
pnpm db:studio
```

Open Drizzle Studio to inspect and manage database records.

### Run the Application

Development mode:

```bash
pnpm start:dev
```

Production build:

```bash
pnpm build
```

Production mode:

```bash
pnpm start:prod
```

The API runs at:

```text
http://localhost:3000/api
```

Swagger documentation is available at:

```text
http://localhost:3000/api/docs
```


## Author

**Sarath**

* GitHub: [withsarath](https://github.com/withsarath)
