# Lead Management System

A MERN Stack Lead Management System built as part of the Digital Heroes Training Task.

## Features

### Public

- Submit new lead
- Contact form validation

### Authentication

- Register
- Login
- JWT Authentication

### Admin

- Dashboard
- View all leads
- Search leads
- Filter by status
- Pagination
- Assign leads
- Update lead status
- Edit lead
- Delete lead
- View activities
- Add notes

### Member

- View assigned leads
- Update lead status
- Add notes
- View activity timeline

---

## Tech Stack

### Frontend

- Next.js 16
- React
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

## Folder Structure

```
client/
server/
```

---

## Installation

### Clone repository

```bash
git clone <repo-url>
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

### Server

```
PORT=
MONGO_URI=
JWT_SECRET=
```

### Client

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## API Routes

### Auth

```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile
```

### Leads

```
POST /api/leads
GET /api/leads
GET /api/leads/:id
PATCH /api/leads/:id
PATCH /api/leads/:id/status
PATCH /api/leads/:id/assign
DELETE /api/leads/:id
GET /api/leads/stats
```

### Notes

```
POST /api/notes/:leadId
GET /api/notes/:leadId
```

### Activities

```
GET /api/activities/:leadId
```

### Users

```
GET /api/users
```

---

## Built For

Digital Heroes Training Task

https://digitalheroesco.com/


## AI tools

I used ChatGPT to brainstorm the project structure, clarify authentication, Learn new less familiar concepts like jest and supertest and testing concepts, and review the README. After that, I rewrote the implementation, modified the architecture, and made design decisions myself.
I coded the basic structure of the frontend pages and integrated backend by myself. Later to modify the UI/UX, I used Claude for impactful design themes.