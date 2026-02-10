# 🏦 Complete Banking Application Setup

Your complete full-stack banking application has been created with all required features!

## 📦 What's Included

### ✅ Backend (Node.js + TypeScript)
- Express.js REST API server
- SQLite3 database with 4 tables
- User authentication (JWT + bcryptjs)
- Account management system
- **Transaction blocking logic** (2 business days excluding weekends)
- Unit tests (dateUtils, authService)
- Integration tests (auth API, account API)

### ✅ Frontend (React + TypeScript)
- Login page with form validation
- Registration page
- Dashboard with account management
- Deposit/Withdraw transaction forms
- Transaction history table
- Block status warning display
- Responsive CSS styling
- Protected routes with JWT

### ✅ Testing
- Jest unit test suite
- Supertest integration tests
- Date calculation tests
- Auth flow tests
- Transaction blocking tests

---

## 🎯 The Key Feature: Transaction Blocking

**Requirement:** Block users from making transactions for the next 2 business days (excluding weekends) after each transaction.

**Implementation:** `backend/src/utils/dateUtils.ts`

```typescript
// How it works:
calculateBlockedUntilDate() {
  1. Start from tomorrow
  2. Count 2 business days (Mon-Fri only)
  3. Skip weekends
  4. Return the blocked until date
}

// Examples:
Friday transaction  → Blocked until Tuesday (weekend skip)
Monday transaction  → Blocked until Wednesday
Thursday transaction → Blocked until Monday (skip weekend)
```

This logic is:
- ✅ Used by `accountService.ts` for deposit/withdraw
- ✅ Stored in `transactionBlocks` database table
- ✅ Checked before allowing new transactions
- ✅ Tested with unit tests
- ✅ Tested with integration tests

---

## 🚀 Quick Start (5 minutes)

### Step 1: Open Terminal - Backend
```powershell
cd "c:\Users\vinutha.gowde\Test\banking-app-new\backend"
npm run dev
```
Expected output: `Banking app backend running on port 5000`

### Step 2: Open Another Terminal - Frontend
```powershell
cd "c:\Users\vinutha.gowde\Test\banking-app-new\frontend"
npm run dev
```
Expected output: `VITE v4.x.x  ready in xxx ms` and local URL shown

### Step 3: Open Browser
Go to: **http://localhost:3000**

---

## 🧪 Testing the Application

### Test Scenario 1: Basic User Flow
1. Click "Register here"
2. Enter: name, email, password
3. Click Register → Dashboard opens
4. You now have $0 balance

### Test Scenario 2: Make a Transaction & See Blocking
1. On dashboard, enter amount (e.g., 100)
2. Click "Deposit"
3. **✨ Success!** Transaction completes
4. **⚠️ Warning appears:** "Transaction Blocked until [date]"
5. Try to deposit again → Error: "You cannot make transactions. Your account is blocked..."
6. Check "Transaction History" → Deposit appears

### Test Scenario 3: Multiple Users
1. Register user 1 (email1@test.com)
2. Deposit $100 → Gets blocked
3. Logout
4. Register user 2 (email2@test.com)
5. Deposit $200 → User 2 can deposit (separate blocking)
6. Logout and login as user 1 → Still blocked

### Test Scenario 4: Block Timing
1. Make deposit on Friday → Blocked until Tuesday
2. Make deposit on Monday → Blocked until Wednesday
3. Make deposit on Thursday → Blocked until Monday (next week, weekend skipped)

---

## 🧪 Run Automated Tests

### All Tests
```bash
cd backend
npm test
```

### Unit Tests Only
```bash
npm run test:unit
```
Tests for:
- Block calculation logic
- Token generation
- Date utilities

### Integration Tests Only
```bash
npm run test:integration
```
Tests for:
- User registration
- User login
- Account operations
- Transaction blocking in API

### Watch Mode (Auto-rerun on changes)
```bash
npm run test:watch
```

---

## 📁 Project Structure

```
banking-app-new/
│
├── backend/
│   ├── src/
│   │   ├── app.ts                      ← Express server
│   │   ├── controllers/
│   │   │   ├── authController.ts      ← Register/Login handlers
│   │   │   └── accountController.ts   ← Account handlers
│   │   ├── services/
│   │   │   ├── authService.ts         ← JWT & password logic
│   │   │   └── accountService.ts      ← Balance & blocking logic
│   │   ├── models/
│   │   │   └── database.ts            ← SQLite setup
│   │   ├── middlewares/
│   │   │   └── authMiddleware.ts      ← JWT verification
│   │   ├── utils/
│   │   │   └── dateUtils.ts           ← 🔑 BLOCKING LOGIC HERE
│   │   ├── routes/
│   │   ├── types/
│   │   └── config/
│   │
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── dateUtils.test.ts
│   │   │   └── authService.test.ts
│   │   └── integration/
│   │       ├── auth.integration.test.ts
│   │       └── account.integration.test.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── .env                            ← Configuration
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx           ← Login form
│   │   │   ├── RegisterPage.tsx        ← Registration form
│   │   │   └── DashboardPage.tsx       ← Main dashboard
│   │   ├── context/
│   │   │   └── AuthContext.tsx         ← Auth state
│   │   ├── services/
│   │   │   └── api.ts                  ← API client
│   │   ├── components/
│   │   ├── types/
│   │   └── styles/
│   │       ├── auth.css
│   │       └── dashboard.css
│   │
│   ├── App.tsx                         ← Router & routing
│   ├── main.tsx                        ← Entry point
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── README.md                           ← Full documentation
├── QUICKSTART.md                       ← Quick start guide
├── IMPLEMENTATION.md                   ← Technical details
├── .gitignore
└── SETUP.md                            ← This file
```

---

## 🔌 API Endpoints

All requests to account endpoints require:
```
Authorization: Bearer <token>
```

### Authentication
```
POST /api/auth/register
  Body: { email, password, fullName }
  Response: { user, token }

POST /api/auth/login
  Body: { email, password }
  Response: { user, token }
```

### Account (Protected)
```
GET /api/account/details
  Response: { id, userId, balance, createdAt, updatedAt }

POST /api/account/deposit
  Body: { amount, description? }
  Response: { id, userId, amount, type, createdAt }
  Error if blocked: { error: "You cannot make transactions. Your account is blocked until [date]" }

POST /api/account/withdraw
  Body: { amount, description? }
  Response: { id, userId, amount, type, createdAt }
  Error if blocked/insufficient: { error: "..." }

GET /api/account/transactions
  Response: [{ id, userId, amount, type, description, createdAt }, ...]

GET /api/account/block-status
  Response: { isBlocked: boolean, blockedUntil?: "2024-01-10T00:00:00.000Z" }
```

---

## 📊 Database Schema

### users table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL (bcrypted),
  fullName TEXT NOT NULL,
  createdAt TEXT NOT NULL (ISO date)
)
```

### accounts table
```sql
CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  balance REAL NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
)
```

### transactions table
```sql
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  amount REAL NOT NULL,
  type TEXT NOT NULL ('deposit' or 'withdrawal'),
  description TEXT,
  createdAt TEXT NOT NULL
)
```

### transactionBlocks table
```sql
CREATE TABLE transactionBlocks (
  userId TEXT PRIMARY KEY,
  blockedUntil TEXT NOT NULL (ISO date)
)
```

---

## 🔐 Authentication Flow

1. **Register**
   - User enters email, password, name
   - Password hashed with bcryptjs (10 rounds)
   - User record created in database
   - Account created with $0 balance
   - JWT token generated (expires in 24h)
   - Token returned to frontend

2. **Login**
   - User enters email, password
   - Password verified against hash
   - JWT token generated
   - Token returned to frontend

3. **Protected Requests**
   - Frontend sends token in `Authorization: Bearer <token>`
   - Backend middleware verifies token
   - userId extracted and added to request
   - Request proceeds if valid, returns 401 if invalid

---

## 🛠️ Environment Configuration

File: `backend/.env`

```
PORT=5000                                    # Server port
NODE_ENV=development                        # development or production
JWT_SECRET=banking_app_secret_...          # Change this in production!
DB_PATH=./database.sqlite                  # Database file location
```

For production:
1. Change JWT_SECRET to a random string
2. Set NODE_ENV=production
3. Use environment variables securely
4. Enable HTTPS
5. Add rate limiting

---

## 📈 Key Files to Understand

### 1. Transaction Blocking Logic
**File:** `backend/src/utils/dateUtils.ts`

This is where the core requirement is implemented:
- `calculateBlockedUntilDate()` - Calculates block end date
- `isUserBlocked()` - Checks if user is currently blocked
- `getRemainingBlockTime()` - Shows remaining block duration

### 2. Account Service
**File:** `backend/src/services/accountService.ts`

Uses blocking logic:
- `deposit()` - Creates transaction, blocks account, updates balance
- `withdraw()` - Creates transaction, blocks account, updates balance
- `getBlockStatus()` - Returns block info

### 3. Frontend Dashboard
**File:** `frontend/src/pages/DashboardPage.tsx`

UI that displays:
- Account balance
- Block warning if blocked
- Deposit/withdraw forms (disabled if blocked)
- Transaction history
- Block status check

---

## 🐛 Troubleshooting

### Port 5000/3000 already in use
```bash
# Backend on different port
set PORT=5001 && npm run dev

# Frontend on different port
npm run dev -- --port 3001
```

### Database locked or corrupted
```bash
# Delete and recreate database
del database.sqlite
npm run dev
```

### Package not found errors
```bash
# Reinstall dependencies
cd backend
npm install

cd ../frontend
npm install
```

### Token expired errors
```bash
# Clear localStorage in browser console
localStorage.clear()
```

### CORS errors
Ensure:
- Backend running on http://localhost:5000
- Frontend running on http://localhost:3000
- Vite proxy is configured in `vite.config.ts`

---

## 📚 Additional Resources

- `README.md` - Full project documentation
- `QUICKSTART.md` - Quick start guide
- `IMPLEMENTATION.md` - Technical implementation details
- Test files - Usage examples of all features

---

## ✨ What's Next?

After running and testing:

1. **Explore the Code**
   - Read dateUtils.ts to understand blocking logic
   - Check accountService.ts for business logic
   - Review DashboardPage.tsx for UI implementation

2. **Run the Tests**
   - See how blocking logic is tested
   - Understand auth flow testing
   - View integration test examples

3. **Extend the Application**
   - Add user profile editing
   - Implement fund transfers
   - Add transaction filters
   - Create receipt generation
   - Setup email notifications

4. **Deploy to Production**
   - Build both backend and frontend
   - Configure environment variables
   - Setup secure database
   - Enable HTTPS
   - Add monitoring

---

## 🎓 Learning Outcomes

By studying this application, you'll learn:

- ✅ Full-stack TypeScript development
- ✅ Express.js REST API design
- ✅ SQLite database modeling
- ✅ JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ React hooks and Context API
- ✅ React Router navigation
- ✅ Axios HTTP client
- ✅ Jest unit testing
- ✅ Supertest integration testing
- ✅ Business logic implementation
- ✅ Date/time calculations
- ✅ Error handling patterns
- ✅ Responsive CSS design

---

## 🎉 Ready to Go!

Everything is set up and ready to use. Just:

1. Open two terminals
2. Run `npm run dev` in backend folder
3. Run `npm run dev` in frontend folder
4. Open http://localhost:3000
5. Create an account and test!

**Happy banking! 🏦**

For questions, check the code comments and test files!
