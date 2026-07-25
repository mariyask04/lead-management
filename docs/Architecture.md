# Architecture Overview

## Frontend

Next.js App Router is used for building the client application.

Main pages:

- Public Lead Form
- Login
- Register
- Dashboard
- Lead Details

Authentication state is managed using React Context.

Axios is used for API communication.

---

## Backend

Express.js exposes REST APIs.

Authentication is implemented using JWT middleware.

MongoDB stores:

- Users
- Leads
- Notes
- Activities

Controllers handle business logic.

Routes expose endpoints.

Middleware performs authentication and authorization.

---

## Database

Collections

- Users
- Leads
- Notes
- Activities

Relationships

Lead

↓

assignedTo → User

↓

Notes

↓

Activities

---

## Authentication Flow

User Login

↓

JWT Generated

↓

Stored in Local Storage

↓

Axios sends Authorization Header

↓

Protected APIs verify JWT

---

## Roles

Admin

- Manage all leads
- Assign leads
- Delete leads
- Edit leads

Member

- View assigned leads
- Update status
- Add notes