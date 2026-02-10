# 🏦 Banking App - Quick Reference

## 🚀 Start Application (2 Commands)

### Terminal 1 - Backend
```powershell
cd c:\Users\vinutha.gowde\Test\banking-app-new\backend
npm run dev
```
✅ Runs on `http://localhost:5000`

### Terminal 2 - Frontend  
```powershell
cd c:\Users\vinutha.gowde\Test\banking-app-new\frontend
npm run dev
```
✅ Runs on `http://localhost:3000`

### 3. Open Browser
→ **http://localhost:3000**

---

## 📝 User Test Workflow

1. **Register**: Email + Password + Name
2. **Login**: Use registered credentials
3. **Deposit**: Enter $100 → Transaction created
4. **See Block**: Warning shows "Blocked until [date]"
5. **Try Deposit Again**: Error "Account is blocked"
6. **View History**: See deposit in transaction list
7. **Check Block Status**: Shows remaining days
8. **Logout**: Click logout button

---

## 🧪 Run Tests

```bash
cd backend
npm test                    # All tests
npm run test:unit          # Just unit tests
npm run test:integration   # Just integration tests
npm run test:watch         # Watch mode
```

Expected: **20+ tests passing** ✅

---

## 🔑 Key Features

| Feature | Status | Location |
|---------|--------|----------|
| User Authentication | ✅ | `/backend/src/services/authService.ts` |
| Account Balance | ✅ | `/backend/src/models/database.ts` |
| Deposit Money | ✅ | `/backend/src/services/accountService.ts` |
| Withdraw Money | ✅ | `/backend/src/services/accountService.ts` |
| **Transaction Blocking** | ✅ | **/backend/src/utils/dateUtils.ts** 🔑 |
| Block Logic | ✅ | **calculateBlockedUntilDate()** |
| Responsive UI | ✅ | `/frontend/src/pages/DashboardPage.tsx` |
| Protected Routes | ✅ | `/frontend/src/App.tsx` |
| Testing Suite | ✅ | `/backend/tests/` |

---

## 🎯 Transaction Blocking (Core Feature)

**Rule**: Block for 2 business days (excluding weekends)

**Examples**:
- Friday deposit → Blocked until Tuesday
- Monday deposit → Blocked until Wednesday  
- Thursday deposit → Blocked until Monday (next week)

**Code Location**: 
```
backend/src/utils/dateUtils.ts
└─ calculateBlockedUntilDate()
```

**How It Works**:
1. Transaction happens → Service calls calculateBlockedUntilDate()
2. Function counts 2 business days from tomorrow
3. Skips weekends (Saturday & Sunday)
4. Returns blocked-until date
5. Stored in database `transactionBlocks` table
6. Checked before allowing next transaction
7. Shown as warning on dashboard

---

## 📊 File Organization

```
backend/
├── src/
│   ├── app.ts                    ← Start here
│   ├── controllers/              ← HTTP handlers
│   ├── services/                 ← Business logic
│   │   └── accountService.ts     ← Uses blocking logic
│   ├── models/database.ts        ← Database
│   └── utils/dateUtils.ts        ← 🔑 KEY FILE
├── tests/                        ← Test suite
└── package.json                  ← npm scripts

frontend/
├── src/
│   ├── pages/DashboardPage.tsx  ← Main UI
│   ├── context/AuthContext.tsx  ← Auth state
│   ├── services/api.ts          ← API calls
│   └── styles/                  ← CSS
└── package.json                 ← npm scripts
```

---

## 💻 API Endpoints (8 Total)

### Public (No Auth Required)
```
POST   /api/auth/register   → { user, token }
POST   /api/auth/login      → { user, token }
GET    /api/health          → { status: "OK" }
```

### Protected (JWT Required)
```
GET    /api/account/details        → Account info
POST   /api/account/deposit        → Create deposit
POST   /api/account/withdraw       → Create withdrawal  
GET    /api/account/transactions   → Transaction list
GET    /api/account/block-status   → Block info
```

---

## 🗄️ Database (4 Tables)

```
users
├── id, email (unique), password (hashed)
├── fullName, createdAt

accounts
├── id, userId (FK), balance
├── createdAt, updatedAt

transactions
├── id, userId (FK), amount
├── type (deposit/withdrawal), description, createdAt

transactionBlocks
└── userId (PK, FK), blockedUntil (ISO date)
```

---

## 🔒 Security

✅ Passwords hashed with bcryptjs
✅ JWT tokens (24h expiration)
✅ Protected routes with middleware
✅ Input validation on all endpoints
✅ TypeScript type safety
✅ Database FK relationships

⚠️ Production: Change JWT_SECRET before deployment

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Full documentation |
| QUICKSTART.md | Quick start guide |
| SETUP.md | Complete setup instructions |
| IMPLEMENTATION.md | Technical details |
| ARCHITECTURE.md | System architecture |
| PROJECT_SUMMARY.md | Feature summary |

All in: `c:\Users\vinutha.gowde\Test\banking-app-new\`

---

## 🧪 Test Examples

### Unit Test - Blocking Logic
```typescript
// What it tests:
- Friday transaction blocks until Tuesday
- Business days only (no weekends)
- Correct date calculation

npm run test:unit
```

### Integration Test - Full Flow
```typescript
// What it tests:
- Register new user
- Login with credentials
- Deposit money
- Account gets blocked
- Cannot deposit again
- Transaction appears in history

npm run test:integration
```

---

## 🎓 Learning Paths

### Path 1: Understand Business Logic
1. Read: `backend/src/utils/dateUtils.ts`
2. Review: `tests/unit/dateUtils.test.ts`
3. Check: `backend/src/services/accountService.ts`

### Path 2: Understand Architecture
1. Read: `ARCHITECTURE.md`
2. Trace: API request flow through layers
3. Check: Database schema relationships

### Path 3: Understand Frontend
1. Check: `frontend/src/pages/DashboardPage.tsx`
2. Review: React hooks and state management
3. Explore: Form handling and error display

### Path 4: Full Stack
1. Start: `backend/src/app.ts`
2. Follow: Request through all layers
3. End: Frontend UI update

---

## ⚡ Common Commands

```bash
# Backend
cd backend
npm run dev              # Start dev server
npm run build            # Build TypeScript
npm test                 # Run all tests
npm run test:watch      # Watch tests

# Frontend
cd frontend
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview build

# Both
npm install              # Install dependencies
```

---

## 🐛 Quick Fixes

**Port already in use?**
```bash
# Use different port
set PORT=5001 && npm run dev
```

**Database error?**
```bash
# Delete and recreate
del database.sqlite
npm run dev
```

**Module not found?**
```bash
# Reinstall
npm install
```

**Token issues?**
```javascript
// In browser console
localStorage.clear()
// Refresh and login again
```

---

## ✨ What You Can Do

- ✅ Register multiple users
- ✅ Test blocking on different days
- ✅ View transaction history
- ✅ Run full test suite
- ✅ Study the code
- ✅ Extend functionality
- ✅ Deploy to production
- ✅ Add new features

---

## 📞 Need Help?

1. **Check Documentation**: README.md, QUICKSTART.md, SETUP.md
2. **Review Code Comments**: Every important section has comments
3. **Study Tests**: Test files show usage examples
4. **Check Architecture**: ARCHITECTURE.md has detailed diagrams
5. **Read Implementation**: IMPLEMENTATION.md has technical details

---

## 🎯 Next Actions

1. **Start the app** (2 commands in 2 terminals)
2. **Test the features** (register, deposit, see block)
3. **Run the tests** (`npm test` in backend)
4. **Explore the code** (start with dateUtils.ts)
5. **Read documentation** (README.md)
6. **Extend features** (add transfer, notifications, etc.)

---

**Application is 100% ready to use!** 🚀

Open two terminals and run `npm run dev` in both folders, then go to http://localhost:3000

**Happy banking! 🏦**
