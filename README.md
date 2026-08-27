# CareerHub — Full-Stack Recruitment & Placement Platform

**Live Demo:** [https://career-hub-full-stack-9d8g-54on5ho5a-nischal8.vercel.app/](https://career-hub-full-stack-9d8g-54on5ho5a-nischal8.vercel.app/)

CareerHub is a full-stack recruitment and placement platform designed for modern hiring workflows. It connects candidates, recruiters, and companies through role discovery, applications, lifecycle management, recruiting operations, and placement dashboards.

## Product Goals

CareerHub supports:
- candidate-first job search, filtering, and role discovery
- saved-job shortlisting for future applications
- end-to-end application lifecycle status tracking
- recruiter applicant review and hiring pipeline movement
- candidate analytics derived from application aggregates

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Redux Toolkit, React Router, shadcn-style adapter components
- Backend: Node.js, Express.js, JWT cookie authentication, Mongoose ODM
- Persistence: MongoDB
- Media and document handling: Cloudinary and Multer for resume/profile assets

## Repository Layout

- Backend API: backend/
  - controllers/: request handling for user, job, application, and company workflows
  - models/: Mongoose schemas for User, Job, Company, and Application
  - routes/: route definitions for the REST surface
  - utils/: DB, Cloudinary, and upload helper wiring
- Frontend UI: frontend/
  - src/components/: screens, cards, tables, dashboards, and pages
  - src/redux/: global state slices
  - src/hooks/: data layer integrations

## Implemented Features

### Candidate Workflow
- Job search and salary/experience/location/job-type filtering
- Saved jobs workflow and saved-list screen
- Apply-now flow that prevents duplicate applications
- Application analytics and status lifecycle visibility

### Recruiter Workflow
- Recruiter dashboard and protected route structure
- Company and job creation flows
- Applicant review and status updates across the CareerHub lifecycle
- Authorization checks before state changes or applicant downloads are exposed

## Environment

The backend expects environment-driven configuration such as:
- MONGO_URI
- SECRET_KEY
- Cloudinary account configuration
- CORS and cookie configuration values

The frontend API endpoints are pointed to the local REST host at http://localhost:3000.

## Local Development

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Production build:

```bash
cd frontend
npm run build
```
