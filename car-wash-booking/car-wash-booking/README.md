# Car Wash Booking (MERN) — Boilerplate

## Setup backend
1. cd backend
2. copy `.env.example` to `.env` and set `MONGO_URI`
3. npm install
4. npm run seed   # optional seed data
5. npm run dev    # or npm start

## Setup frontend
1. cd frontend
2. npm install
3. npm start

## API endpoints
- GET /api/bookings
- GET /api/bookings/:id
- POST /api/bookings
- PUT /api/bookings/:id
- DELETE /api/bookings/:id

## Notes
- Pagination/filter/search supported via query params for GET /api/bookings
- Sample seed creates 5 bookings
