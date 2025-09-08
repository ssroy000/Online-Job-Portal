# Online Job Portal - Login History Backend

## Run backend

1. Install Node 18+
2. In project root:

```
npm install
npm run dev:server
```

- Server runs at http://localhost:4000
- Endpoints:
  - POST /api/login-history
  - GET /api/login-history?email=you@example.com

Data saved to `data/login-history.json`.

## Frontend integration
- On login success/failure, the app posts to the backend.
- In Jobs → Post tab, there is a "Login History (Recent)" card with a Refresh button.

## Dev convenience
Run frontend live server plus backend together:

```
npm run dev
```