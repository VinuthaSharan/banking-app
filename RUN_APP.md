# Quick Start: Running the Enhanced Banking App

## Prerequisites

- Node.js 16+ and npm installed
- Git (optional, for cloning)

## Step 1: Backend Setup (Terminal 1)

```bash
# Navigate to backend directory
cd banking-app-new/backend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
Server running on http://localhost:5000
Database initialized at ./database.sqlite
```

✅ Backend is now running on `http://localhost:5000`

## Step 2: Frontend Setup (Terminal 2)

```bash
# Navigate to frontend directory (in a new terminal)
cd banking-app-new/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5000
  ➜  press h to show help
```

✅ Frontend is now running on `http://localhost:5000`

## Step 3: Access the Application

1. Open your browser and go to: **http://localhost:5000**
2. You should see the Login page

## Step 4: Create an Account

1. Click **"Don't have an account? Register here"**
2. Enter the following:
   - **Full Name**: John Doe (or any name)
   - **Email**: john@example.com
   - **Password**: password123
3. Click **Register**
4. You'll be redirected to the Login page

## Step 5: Login

1. Enter your credentials:
   - **Email**: john@example.com
   - **Password**: password123
2. Click **Login**
3. **Boom!** You're now on the enhanced Dashboard 🎉

## Step 6: Explore the Dashboard

### View Statistics
- See your current **Balance** (starts at $0)
- View **Total Deposits** and **Withdrawals** (both 0 initially)
- Check **Block Status** (should show "Active" 🔓)

### Make Your First Deposit
1. Fill in the **Deposit Form** on the left:
   - Amount: `500` (or any amount)
   - Description: "Initial deposit" (optional)
2. Click **💵 Deposit Now**
3. ✅ Success message appears at top
4. Watch as:
   - Balance updates to $500
   - Total Deposits shows $500
   - Block Status changes to "Blocked" 🔒
   - Charts populate with data (pie, bar, line)

### View Block Status
- Check the **yellow block status card** showing when you can next transact
- Read the **⚠️ warning banner** explaining the 2-business-day block

### Explore Charts
1. **Deposits vs Withdrawals Pie Chart**: Shows your $500 deposit (100%)
2. **Monthly Trends Bar Chart**: Shows this month's activity
3. **Balance Over Time Line Chart**: Shows balance progression

### Make a Withdrawal (After Block Expires)
1. Wait until the block expires (or manually adjust system date/time for testing)
2. Fill in the **Withdraw Form** on the right:
   - Amount: `100` (less than your balance)
   - Description: "ATM withdrawal" (optional)
3. Click **💸 Withdraw Now**
4. ✅ Charts update to reflect the withdrawal
5. Watch charts change:
   - Pie chart shows both deposits and withdrawals
   - Bar chart shows mixed activity
   - Balance line chart updates

### View Transaction History
- Scroll to **Transaction History** section
- See all your transactions with:
  - Date and time
  - Type badge (📥 Deposit or 📤 Withdrawal)
  - Amount with +/- sign
  - Description

### Test Insufficient Balance
1. Try to withdraw more than your balance
2. ❌ Error message: "Insufficient balance"
3. Form remains disabled until you can transact

### Logout
1. Click **Logout** button in top right
2. You'll be redirected to Login page
3. Login again to see your persistent data

## Step 7: Run Tests (Optional)

### Backend Tests
```bash
cd banking-app-new/backend

# Run all tests
npm test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run tests in watch mode
npm run test:watch
```

### Expected Test Results
```
PASS  tests/unit/dateUtils.test.ts
PASS  tests/unit/authService.test.ts
PASS  tests/integration/auth.integration.test.ts
PASS  tests/integration/account.integration.test.ts

Test Suites: 4 passed, 4 total
Tests:       20 passed, 20 total
```

## Troubleshooting

### Port Already in Use
If you see "Port 5000 already in use":
```bash
# Kill the process using the port (Windows PowerShell)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use a different port in backend
# Edit backend/.env: PORT=5001
```

### Module Not Found Errors
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -r node_modules
npm install
```

### Backend Won't Start
```bash
# Check if Node is installed
node --version

# Check npm version
npm --version

# Make sure you're in the right directory
cd banking-app-new/backend
```

### Charts Not Showing
- Make sure you have at least one transaction
- Refresh the page (F5)
- Check browser console for errors (F12)

### Can't Login
- Verify you registered correctly
- Check email spelling
- Ensure password is correct (case-sensitive)

### Transactions Not Saving
- Check backend is running on http://localhost:5000
- Look for API errors in browser console (F12)
- Check backend logs in terminal

## Features to Try

### 1. Transaction Blocking
- Make a transaction
- Try to make another immediately
- ✅ See the block warning and countdown
- Wait until block expires

### 2. Charts & Analytics
- Make several transactions
- Watch charts populate
- Try deposits and withdrawals
- See pie chart percentages change
- Watch line chart show balance trend

### 3. Form Validation
- Try to submit empty form
- Try to withdraw more than balance
- Try invalid email during registration

### 4. Responsive Design
- Open DevTools (F12)
- Toggle Device Toolbar
- Test on different screen sizes
- Charts and forms adapt beautifully

### 5. Data Persistence
- Make transactions
- Logout and login again
- All data is preserved
- Charts show historical data

## Database

The application uses SQLite which creates a local database file:
```
banking-app-new/backend/database.sqlite
```

**To reset the database:**
```bash
# Delete the database file
rm database.sqlite

# Restart the backend
npm run dev
```

A new database will be created automatically.

## Environment Variables

### Backend (.env)
Located at `banking-app-new/backend/.env`:
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

### Frontend Configuration
Vite automatically uses `http://localhost:5000/api` for API calls.
To change this, set:
```bash
VITE_API_URL=http://your-api-url:5000/api
```

## Production Build

### Build Backend
```bash
cd backend
npm run build
npm start
```

### Build Frontend
```bash
cd frontend
npm run build
```

Creates optimized production build in `dist/` folder.

## Next Steps

1. ✅ Run the application locally
2. ✅ Create an account
3. ✅ Make transactions
4. ✅ Explore the dashboard charts
5. ✅ Test block status functionality
6. ✅ Review transaction history
7. ✅ Run tests to verify functionality

## Support

For detailed dashboard guide, see: `DASHBOARD_GUIDE.md`
For architecture overview, see: `ARCHITECTURE.md`
For implementation details, see: `IMPLEMENTATION.md`

---

**Happy Banking! 🎉💰**
