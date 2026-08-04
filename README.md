# RailEase Railway Ticket Booking System

A simple Software Engineering laboratory project built with React, Express, and MongoDB.

## Features
- Landing page with modern UI
- Register and login using JWT authentication
- Passenger dashboard with booking summary
- Train search and booking flow
- E-ticket page
- Profile management
- Backend APIs for auth, trains, bookings, payments, and admin

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node server.js
```

### Seed data
```bash
cd backend
node data/seed.js
```

## Demo instructions
- Open `http://localhost:5173` in your browser.
- Register a new user from the UI.
- The account is saved to `backend/data/app-data.json`.
- Login with the same username and password to access booking.

## Notes
- The backend uses file-based persistence via `backend/data/app-data.json` for demo convenience.
- This means new users are stored locally in the project folder and survive restarts.
