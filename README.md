# Sweet Shop Management System

A full-stack Sweet Shop Management System built as part of the **Incubyte TDD Kata** assessment.

This project demonstrates backend API development, database integration, frontend implementation, basic automated testing, and transparent AI-assisted development.

---

## Tech Stack

### Backend
- Node.js
- Express
- Prisma ORM
- SQLite
- Jest + Supertest (testing)

### Frontend
- React
- Vite
- CSS

---

## Features

- User registration and login
- Add, view, and search sweets
- Purchase sweets with real-time inventory updates
- Restock sweets
- Frontend order summary
- Clean, minimal UI
- Automated backend tests

---

## Project Structure

sweet-shop-management/
├── backend/
│ ├── src/
│ ├── prisma/
│ ├── tests/
│ └── package.json
├── frontend/
│ ├── src/
│ └── package.json
└── README.md

---

## How to Run Locally

### Backend

```bash
cd backend
npm install
node src/server.js
Backend runs on: http://localhost:4000

cd frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173

Running Tests
cd backend
npm test


This runs Jest + Supertest tests for authentication and sweets APIs.

Testing & TDD Approach

Due to time constraints, full Red-Green-Refactor cycles were not completed.
However, an initial automated test suite was added to validate core backend flows and establish a solid foundation for extending TDD practices.

My AI Usage

I used ChatGPT as an AI assistant to:

Clarify backend structure and API design

Debug issues during development

Generate initial test case ideas

All implementation decisions, code integration, debugging, and validation were performed by me.
AI was used transparently as a productivity and learning aid, in line with the assignment guidelines.

Assumptions & Trade-offs

Authentication endpoints are implemented; full JWT-based route protection and role-based authorization are noted as future improvements.

The frontend focuses on demonstrating inventory and purchase flows rather than full role-based UI separation.

Automated tests were prioritized for core flows within the given time constraints.

Future Improvements

Add JWT-based authentication middleware

Enforce admin-only actions

Expand test coverage with full TDD cycles

Deploy the application

Author

Jiya Bhagwani


---
