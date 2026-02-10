# Quick Start Guide

## Project Summary

This is a full-stack banking application with:
- ✅ User Authentication (Register/Login)
- ✅ Account Management with balance tracking
- ✅ Deposit & Withdrawal transactions
- ✅ **Transaction Blocking**: Users are blocked from making transactions for 2 business days (excluding weekends) after each transaction
- ✅ React + TypeScript frontend with responsive UI
- ✅ Node.js + TypeScript backend with SQLite database
- ✅ Comprehensive unit and integration tests
- ✅ JWT-based authentication

## Getting Started

### Step 1: Start the Backend

Open a terminal and run:

```bash
cd backend
npm run dev
```

You should see: `Banking app backend running on port 5000`

### Step 2: Start the Frontend

Open another terminal and run:

```bash
cd frontend
npm run dev
```

You should see the Vite server starting on `http://localhost:3000`

### Step 3: Access the Application

Open your browser and go to: **http://localhost:3000**

## User Workflow

### 1. Register a New Account
- Click "Register here" link
- Enter name, email, and password
- System creates account with $0 balance

### 2. Login
- Enter email and password
- Redirected to dashboard

### 3. Make a Transaction
- View your account balance
- Enter amount and click "Deposit" or "Withdraw"
- Check the transaction history

### 4. View Block Status
- After any transaction, you'll see a warning: "Transaction Blocked"
- The warning shows the date until you can make another transaction
- Weekends are automatically excluded from the count

**Example Blocking:**
- Transaction on **Friday** → Blocked until **Tuesday**
- Transaction on **Monday** → Blocked until **Wednesday**
- Transaction on **Thursday** → Blocked until **Monday** (skips weekend)

## API Documentation

### Authentication Endpoints

**Register:**
```bash
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

**Login:**
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Account Endpoints (Require Bearer Token)

**Get Account Details:**
```bash
GET /api/account/details
```

**Deposit Money:**
```bash
POST /api/account/deposit
{
  "amount": 100,
  "description": "Salary deposit"
}
```

**Withdraw Money:**
```bash
POST /api/account/withdraw
{
  "amount": 50,
  "description": "Cash withdrawal"
}
```

**Get Transactions:**
```bash
GET /api/account/transactions
```

**Check Block Status:**
```bash
GET /api/account/block-status
```

## Testing

Run tests in backend folder:

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run tests in watch mode
npm run test:watch
```

## File Structure Overview

```
Banking App
├── backend/
│   ├── src/
│   │   ├── app.ts ........................ Express server
│   │   ├── controllers/
│   │   │   ├── authController.ts ........ Auth endpoints
│   │   │   └── accountController.ts .... Account endpoints
│   │   ├── services/
│   │   │   ├── authService.ts .......... Auth logic (JWT, hashing)
│   │   │   └── accountService.ts ....... Account logic & blocking
│   │   ├── models/
│   │   │   └── database.ts ............ SQLite setup & queries
│   │   ├── middlewares/
│   │   │   └── authMiddleware.ts ...... JWT verification
│   │   ├── routes/
│   │   │   ├── authRoutes.ts ......... Auth endpoints
│   │   │   └── accountRoutes.ts ...... Account endpoints
│   │   ├── utils/
│   │   │   └── dateUtils.ts ......... Blocking logic 🔑
│   │   └── types/
│   │       └── index.ts ............ TypeScript interfaces
│   └── tests/
│       ├── unit/ ................... dateUtils & authService tests
│       └── integration/ ........... Auth & Account API tests
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── LoginPage.tsx ........ Login form
    │   │   ├── RegisterPage.tsx .... Registration form
    │   │   └── DashboardPage.tsx ... Main dashboard
    │   ├── context/
    │   │   └── AuthContext.tsx .... Auth state management
    │   ├── services/
    │   │   └── api.ts ........... API client (axios)
    │   ├── types/
    │   │   └── index.ts ........ TypeScript interfaces
    │   └── styles/
    │       ├── auth.css ........ Login/Register styles
    │       └── dashboard.css .. Dashboard styles
    ├── App.tsx ............... Router & protected routes
    └── main.tsx ............ React entry point
```

## Key Implementation Details

### Transaction Blocking Logic
Located in: `backend/src/utils/dateUtils.ts`

The blocking logic:
1. After each transaction, calculate next 2 business days
2. Skip weekends (Saturday=6, Sunday=0)
3. Store block date in database
4. Check block status before allowing new transactions

### Database Schema
Uses SQLite with 4 tables:
- **users**: id, email, password (hashed), fullName, createdAt
- **accounts**: id, userId, balance, createdAt, updatedAt
- **transactions**: id, userId, amount, type, description, createdAt
- **transactionBlocks**: userId, blockedUntil

### Authentication
- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens with 24-hour expiration
- Token stored in localStorage on frontend
- Token sent as Bearer token in Authorization header

## Troubleshooting

**Port already in use:**
```bash
# Backend running on different port
PORT=5001 npm run dev

# Frontend running on different port
npm run dev -- --port 3001
```

**Database errors:**
- Delete `database.sqlite` and restart backend
- Database auto-initializes on first run

**CORS errors:**
- Ensure backend is running on http://localhost:5000
- Frontend proxy is configured in vite.config.ts

**Login not working:**
- Clear localStorage: `localStorage.clear()` in browser console
- Ensure backend is running
- Check JWT_SECRET in .env matches tsconfig

## Performance Tips

- Backend uses promises for async database operations
- Frontend uses React Context for state (no Redux needed)
- Vite provides fast hot module reloading
- Database queries are indexed on userId and email

## Security Notes

⚠️ **Production Changes Needed:**
1. Change JWT_SECRET in `.env`
2. Use HTTPS/TLS
3. Add rate limiting middleware
4. Implement CORS whitelist
5. Add input validation
6. Enable helmet.js for security headers
7. Use environment-based configurations

## Next Steps

- Add user profile editing
- Implement transfer between accounts
- Add transaction filters and search
- Setup payment gateway integration
- Add email notifications
- Implement 2FA authentication
- Add transaction receipts/export

## Support

All code includes TypeScript types and comments.
Check test files for usage examples of each feature.
