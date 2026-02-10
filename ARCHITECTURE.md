# Banking Application Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                                  │
│                  (http://localhost:3000)                             │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                        React Frontend
                    (TypeScript + React Router)
                             │
                ┌────────────┴────────────┐
                │                         │
           Pages Layer              Context Layer
        (Login, Register,         (AuthContext)
         Dashboard)               └─ Token Storage
                │                └─ User State
                │
        ┌───────┴──────┐
        │              │
    Auth Routes   Account Routes
        │              │
        └──────┬───────┘
               │
           Axios Client
          (api.ts service)
          JWT Interceptors
               │
               │ HTTP (JSON)
               │
┌──────────────▼──────────────────────────────────────────────────────┐
│                      EXPRESS SERVER                                  │
│                 (http://localhost:5000)                              │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │                    ROUTING LAYER                           │    │
│  │  ┌──────────────┐              ┌──────────────┐           │    │
│  │  │ /api/auth/*  │              │ /api/account*│           │    │
│  │  │              │              │ (Protected)  │           │    │
│  │  └──────┬───────┘              └──────┬───────┘           │    │
│  └─────────┼──────────────────────────────┼──────────────────┘    │
│            │                              │                       │
│  ┌─────────▼──────────────────────────────▼──────────────────┐    │
│  │              MIDDLEWARE LAYER                             │    │
│  │  ┌──────────────────────────────────────────────────┐    │    │
│  │  │ authMiddleware (JWT Verification)               │    │    │
│  │  │ - Extract token from header                     │    │    │
│  │  │ - Verify signature & expiration                 │    │    │
│  │  │ - Attach userId to request                      │    │    │
│  │  └──────────────────────────────────────────────────┘    │    │
│  └───────────────────┬────────────────────────────────────────┘    │
│                      │                                              │
│  ┌───────────────────▼────────────────────────────────────────┐    │
│  │           CONTROLLERS LAYER                               │    │
│  │  ┌──────────────┐              ┌──────────────┐           │    │
│  │  │ authCtrlr    │              │ accountCtrlr │           │    │
│  │  │              │              │              │           │    │
│  │  │ register()   │              │ deposit()    │           │    │
│  │  │ login()      │              │ withdraw()   │           │    │
│  │  └──────┬───────┘              │ getAccount()│           │    │
│  │         │                       │ getBlock()  │           │    │
│  │         │                       │ getTransact │           │    │
│  │         │                       │ ions()      │           │    │
│  │         │                       └──────┬──────┘           │    │
│  └─────────┼───────────────────────────────┼──────────────────┘    │
│            │                              │                       │
│  ┌─────────▼──────────────────────────────▼──────────────────┐    │
│  │            SERVICES LAYER (Business Logic)                │    │
│  │  ┌──────────────┐              ┌──────────────┐           │    │
│  │  │ authService  │              │ accountService           │    │
│  │  │              │              │              │           │    │
│  │  │ register()   │              │ deposit()    │           │    │
│  │  │ login()      │              │ withdraw()   │           │    │
│  │  │ generateToken│              │              │           │    │
│  │  │ verifyToken  │              │ Uses dateUtils.ts        │    │
│  │  │              │              │ calculateBlockedUntilDate│    │
│  │  │              │              │ isUserBlocked()          │    │
│  │  │ Uses bcryptjs│              │ getRemainingBlockTime()  │    │
│  │  └──────┬───────┘              └──────┬──────┘           │    │
│  │         │                              │                 │    │
│  │         │                              │                 │    │
│  │ ┌───────────────────────────────────────┐                │    │
│  │ │ UTILS LAYER                           │                │    │
│  │ │ ┌───────────────────────────────────┐ │                │    │
│  │ │ │ dateUtils.ts                      │ │                │    │
│  │ │ │ 🔑 TRANSACTION BLOCKING LOGIC    │ │                │    │
│  │ │ │                                   │ │                │    │
│  │ │ │ calculateBlockedUntilDate()      │ │                │    │
│  │ │ │  - Start from tomorrow            │ │                │    │
│  │ │ │  - Count 2 business days          │ │                │    │
│  │ │ │  - Skip weekends (Sat/Sun)        │ │                │    │
│  │ │ │  - Return blocked until date      │ │                │    │
│  │ │ │                                   │ │                │    │
│  │ │ │ isUserBlocked()                   │ │                │    │
│  │ │ │  - Check if now < blockedUntil   │ │                │    │
│  │ │ │                                   │ │                │    │
│  │ │ │ getRemainingBlockTime()           │ │                │    │
│  │ │ │  - Calculate days remaining       │ │                │    │
│  │ │ └───────────────────────────────────┘ │                │    │
│  │ └───────────────────────────────────────┘                │    │
│  └──────────┬───────────────────────────────────────────────┘    │
│             │                                                     │
│  ┌──────────▼──────────────────────────────────────────────────┐  │
│  │            MODELS LAYER (Data Access)                       │  │
│  │  ┌───────────────────────────────────────────────────────┐  │  │
│  │  │ database.ts (SQLite3)                                 │  │  │
│  │  │                                                       │  │  │
│  │  │ Database Methods:                                    │  │  │
│  │  │ ├─ User Methods                                      │  │  │
│  │  │ │  ├─ createUser()                                   │  │  │
│  │  │ │  ├─ getUserByEmail()                               │  │  │
│  │  │ │  └─ getUserById()                                  │  │  │
│  │  │ ├─ Account Methods                                   │  │  │
│  │  │ │  ├─ createAccount()                                │  │  │
│  │  │ │  ├─ getAccountByUserId()                           │  │  │
│  │  │ │  └─ updateAccountBalance()                         │  │  │
│  │  │ ├─ Transaction Methods                               │  │  │
│  │  │ │  ├─ createTransaction()                            │  │  │
│  │  │ │  └─ getTransactionsByUserId()                      │  │  │
│  │  │ └─ Block Methods                                     │  │  │
│  │  │    ├─ setTransactionBlock()                          │  │  │
│  │  │    ├─ getTransactionBlock()                          │  │  │
│  │  │    └─ removeTransactionBlock()                       │  │  │
│  │  └───────────────────────────────────────────────────────┘  │  │
│  └──────────┬───────────────────────────────────────────────────┘  │
│             │                                                      │
└─────────────┼──────────────────────────────────────────────────────┘
              │
              │ SQLite Queries
              │
┌─────────────▼──────────────────────────────────────────────────────┐
│                    SQLite DATABASE                                  │
│              (database.sqlite file)                                 │
│                                                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐             │
│  │   users     │  │  accounts   │  │ transactions │             │
│  ├─────────────┤  ├─────────────┤  ├──────────────┤             │
│  │ id (PK)     │  │ id (PK)     │  │ id (PK)      │             │
│  │ email (U)   │  │ userId (FK) │  │ userId (FK)  │             │
│  │ password    │  │ balance     │  │ amount       │             │
│  │ fullName    │  │ createdAt   │  │ type         │             │
│  │ createdAt   │  │ updatedAt   │  │ description  │             │
│  └─────────────┘  └─────────────┘  │ createdAt    │             │
│                                     └──────────────┘             │
│  ┌────────────────────────────┐                                  │
│  │ transactionBlocks          │                                  │
│  ├────────────────────────────┤                                  │
│  │ userId (PK, FK)            │                                  │
│  │ blockedUntil (ISO datetime)│                                  │
│  └────────────────────────────┘                                  │
└────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

### User Registration Flow
```
1. User enters email, password, name
   ↓
2. Frontend: POST /api/auth/register
   ↓
3. Backend authController.register()
   ↓
4. Backend authService.register()
   ├─ Check if user exists
   ├─ Hash password with bcryptjs
   ├─ Create user in database
   └─ Create account with $0 balance
   ↓
5. Generate JWT token
   ↓
6. Return { user, token } to frontend
   ↓
7. Frontend stores token in localStorage
   ↓
8. Redirect to dashboard
```

### Deposit Money Flow
```
1. User enters amount on dashboard
   ↓
2. Frontend: POST /api/account/deposit
   ├─ Set Authorization header with JWT token
   └─ Body: { amount, description }
   ↓
3. Backend authMiddleware
   ├─ Extract token from header
   ├─ Verify token signature & expiration
   └─ Extract userId from token
   ↓
4. Backend accountController.deposit()
   ↓
5. Backend accountService.deposit()
   ├─ Check if user is blocked
   │  ├─ Get transactionBlock from database
   │  └─ Call isUserBlocked(blockedUntil)
   │     └─ If blocked: Return error
   ├─ Get current account balance
   ├─ Update balance: balance + amount
   ├─ Save updated balance to database
   └─ Create transaction record
   ↓
6. 🔑 BLOCKING LOGIC EXECUTED
   ├─ Call calculateBlockedUntilDate()
   │  ├─ Start from tomorrow
   │  ├─ Count 2 business days
   │  └─ Skip weekends
   ├─ Store block in transactionBlocks table
   │  └─ blockedUntil = calculated date
   └─ Return transaction to frontend
   ↓
7. Frontend receives transaction
   ↓
8. Frontend calls getBlockStatus()
   ├─ Backend gets transactionBlock
   └─ Returns { isBlocked: true, blockedUntil: "..." }
   ↓
9. Frontend displays warning:
   "Transaction Blocked until [date]"
   Buttons become disabled
```

### Transaction Check Flow
```
User tries to deposit again within 2 business days
   ↓
Frontend: POST /api/account/deposit (with token)
   ↓
Backend authMiddleware validates token
   ↓
Backend accountService.deposit()
   ├─ Get transactionBlock from database
   ├─ Call isUserBlocked(blockedUntil)
   │  ├─ Now compare: current_time < blockedUntil?
   │  └─ Returns true
   └─ Throw error: "Your account is blocked until [date]"
   ↓
Frontend receives error (400)
   ↓
Frontend displays error message
```

---

## 🔐 Authentication Flow

### Token Generation
```
1. authService.generateToken(userId)
   └─ jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' })
      └─ Returns JWT token string
```

### Token Verification
```
1. Frontend sends request with header:
   Authorization: Bearer <token>
   ↓
2. Backend authMiddleware
   ├─ Extract token from header
   │  └─ Split on space: header.split(' ')[1]
   ├─ Call authService.verifyToken(token)
   │  └─ jwt.verify(token, JWT_SECRET)
   ├─ If valid: Extract userId from decoded token
   ├─ Attach userId to request: req.userId = userId
   └─ Call next() to continue
   ↓
3. Protected route executes with userId available
```

### Token Payload
```
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "iat": 1234567890,        // issued at
  "exp": 1234654290         // expires at (24h later)
}
```

---

## 🗄️ Database Schema Relationships

```
users (1) ─── (many) accounts
  │
  │ has one account
  └─ Foreign Key: userId
  
users (1) ─── (many) transactions
  │
  │ made many transactions
  └─ Foreign Key: userId
  
users (1) ─── (0..1) transactionBlocks
  │
  │ may have block status
  └─ Foreign Key: userId
  
accounts (1) ─── (many) transactions
  │
  │ account has many transactions
  └─ Foreign Key: userId
```

---

## 🔄 State Management

### Frontend - React Context
```
AuthContext
├─ user (User | null)
├─ token (string | null)
├─ isLoading (boolean)
├─ isAuthenticated (boolean)
├─ register() → Promise
├─ login() → Promise
└─ logout() → void

Stored in:
├─ React state (memory)
├─ localStorage (persistence)
└─ Axios interceptor (auto-attach to requests)
```

### Backend - Request Scope
```
Each Request Object
├─ req.body (form data)
├─ req.headers (including Authorization)
├─ req.userId (set by authMiddleware)
└─ req.params (URL parameters)
```

---

## 🧪 Testing Architecture

### Unit Tests
```
dateUtils.test.ts
├─ calculateBlockedUntilDate()
│  ├─ Test blocking with weekends
│  └─ Test different days of week
├─ isUserBlocked()
│  ├─ Test when blocked (true)
│  └─ Test when not blocked (false)
└─ getRemainingBlockTime()
   ├─ Test formatted output
   └─ Test "No restriction" message

authService.test.ts
├─ generateToken()
│  ├─ Valid token creation
│  └─ Different tokens for different users
├─ verifyToken()
│  ├─ Valid token verification
│  ├─ Invalid token rejection
│  └─ Expired token rejection
└─ (Database mocked)
```

### Integration Tests
```
auth.integration.test.ts (HTTP)
├─ POST /api/auth/register
│  ├─ Valid registration
│  ├─ Missing fields
│  ├─ Duplicate email
│  └─ All error cases
├─ POST /api/auth/login
│  ├─ Valid login
│  ├─ Wrong password
│  └─ Non-existent email
└─ GET /api/health

account.integration.test.ts (HTTP)
├─ GET /api/account/details
│  ├─ With valid token
│  ├─ Without token
│  └─ With invalid token
├─ POST /api/account/deposit
│  ├─ Successful deposit
│  ├─ Block status verification
│  ├─ Invalid amount
│  └─ Blocked account error
├─ GET /api/account/transactions
├─ GET /api/account/block-status
└─ POST /api/account/withdraw
```

---

## 📱 Request/Response Examples

### Register Request/Response
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "fullName": "John Doe"
}

Response 201:
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "fullName": "John Doe",
    "createdAt": "2024-01-10T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Deposit Request/Response
```
POST /api/account/deposit
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "amount": 100,
  "description": "Salary deposit"
}

Response 200:
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 100,
  "type": "deposit",
  "description": "Salary deposit",
  "createdAt": "2024-01-10T10:35:00.000Z"
}
```

### Blocked Deposit Response
```
POST /api/account/deposit
Authorization: Bearer ...

{
  "amount": 50,
  "description": "Another deposit"
}

Response 400:
{
  "error": "You cannot make transactions. Your account is blocked until 2024-01-12T10:35:00.000Z"
}
```

### Block Status Response
```
GET /api/account/block-status
Authorization: Bearer ...

Response 200 (Blocked):
{
  "isBlocked": true,
  "blockedUntil": "2024-01-12T10:35:00.000Z"
}

Response 200 (Not Blocked):
{
  "isBlocked": false
}
```

---

## 🚀 Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────┐
│                   PRODUCTION ENVIRONMENT                 │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │                   CDN / Static Hosting            │  │
│  │         (Vercel, Netlify, AWS S3 + CloudFront)   │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  React Frontend (dist files)               │  │  │
│  │  │  - Optimized & minified                    │  │  │
│  │  │  - Served from edge locations              │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↓                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Backend API Server                  │  │
│  │  (AWS EC2 / Heroku / DigitalOcean)              │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  Express.js + Node.js                      │  │  │
│  │  │  - HTTPS/TLS encryption                    │  │  │
│  │  │  - Rate limiting middleware                │  │  │
│  │  │  - CORS whitelist                          │  │  │
│  │  │  - Environment variables                   │  │  │
│  │  │  - Logging & monitoring                    │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↓                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Database                             │  │
│  │  (PostgreSQL on AWS RDS / Heroku Postgres)     │  │
│  │  - Automated backups                           │  │
│  │  - Read replicas                               │  │
│  │  - Encryption at rest                          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Architecture Highlights

✅ **Layered Architecture**: Clean separation of concerns
✅ **RESTful API**: Standard HTTP methods and status codes
✅ **Type Safety**: Full TypeScript implementation
✅ **Database Normalization**: Proper schema with relationships
✅ **Authentication**: JWT tokens with expiration
✅ **Business Logic**: Isolated in services layer
✅ **Error Handling**: Comprehensive error messages
✅ **Testing**: Unit + Integration test coverage
✅ **Scalability**: Modular design for easy extension
✅ **Security**: Password hashing, protected routes, input validation

---

This architecture provides a solid foundation for a production-grade banking application!
