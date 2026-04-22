### Job Application Tracker

Full-stack application for managing job applications, featuring a Kanban-style interface to track progress across recruitment processes.

The project simulates a recruitment pipeline, allowing users to organize opportunities and manage different hiring stages in a structured and visual way.

## Features

* Kanban board with drag-and-drop support
* Create and delete custom columns (e.g., Applied, Interview, Offer)
* Full CRUD for job entries
* Move job entries across different stages
* User authentication
* Automatic initialization of default columns upon registration
* Data persistence using PostgreSQL
  
## Frontend
* Next.js
* React
* TailwindCSS
* shadcn/ui
* Radix UI
  
## Backend
* Next.js (API Routes / Server Actions)
* Prisma ORM
* PostgreSQL

## Other
* DnD Kit
* React Hook Form
* Zod
* Better Auth

## Installation

* Clone the repository
```bash
git clone git@github.com:Rafhael-Augusto/job-application-tracker.git
```

* Navigate to the project folder
```bash
cd job-application-tracker
```

* Install dependencies
```bash
npm install
```

## Configuration

* Create a .env file in the root of the project:

```bash
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"

DATABASE_URL="your-database-url"
```

* Then run:

```bash
npx prisma generate
npx prisma migrate dev
```

## Running the project

```bash
npm run dev
```

* Access the application at:
  
http://localhost:3000

## Deployment
https://job-application-tracker-nu-three.vercel.app/
