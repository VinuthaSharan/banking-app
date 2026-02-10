# Enhanced Dashboard Guide

## Overview

The enhanced banking dashboard provides a comprehensive view of your financial activity with interactive charts, real-time statistics, and intuitive transaction management.

## Dashboard Sections

### 1. Header Section
**Location**: Top of the page

- **💳 Banking Dashboard**: Main title with subtitle
- **User Profile**: Displays user's full name and email
- **Avatar**: Circle showing first letter of user's name
- **Logout Button**: Quick access to logout

### 2. Alert Messages
**Location**: Below header

Displays success or error messages for transactions:
- ✅ **Green Alert**: Successful deposit/withdrawal
- ❌ **Red Alert**: Error messages (insufficient balance, blocked account, etc.)
- Auto-closes after 3 seconds

### 3. Statistics Cards
**Location**: Below alerts

Four interactive cards showing key financial metrics:

#### Balance Card (Purple)
- Shows current account balance
- Updates in real-time after transactions
- Emoji: 💰

#### Total Deposits Card (Green)
- Cumulative sum of all deposits
- Calculated from transaction history
- Emoji: 📈

#### Total Withdrawals Card (Red)
- Cumulative sum of all withdrawals
- Calculated from transaction history
- Emoji: 📉

#### Block Status Card
- **Green** when account is active (unlocked)
- **Yellow** when account is blocked
- Shows blocking reason and date if blocked
- Emoji: 🔓 (unlocked) or 🔒 (locked)

**Hover Effect**: Cards lift up with enhanced shadow on hover

### 4. Block Warning Banner
**Location**: Below stats cards (only if account is blocked)

Displays when user cannot make transactions:
- Warning icon (⚠️)
- Blocked date
- Note about weekends being excluded
- Yellow/amber color scheme

### 5. Analytics Charts Section
**Location**: Three-column grid below banner

#### Pie Chart: Deposits vs Withdrawals
- **Title**: 💵 Deposits vs Withdrawals
- **Purpose**: Visual distribution of deposits (green) vs withdrawals (red)
- **Data**: Entire transaction history
- **Interactive**: Hover to see percentages

#### Bar Chart: Monthly Transaction Trends
- **Title**: 📊 Monthly Transaction Trends
- **Purpose**: Compare monthly deposits and withdrawals over last 6 months
- **Data**: Last 6 months of transactions
- **Colors**: Green bars for deposits, red bars for withdrawals
- **X-axis**: Month labels
- **Y-axis**: Amount in dollars

#### Line Chart: Balance Over Time
- **Title**: 📈 Balance Over Time
- **Purpose**: Track account balance progression over 6 months
- **Data**: Calculated balance at the end of each month
- **Color**: Purple line showing balance trend
- **Interactive**: Hover to see exact balance for each month

**Note**: Charts only display if there are transactions. Empty state shows "No transaction data yet".

### 6. Transaction Forms Section
**Location**: Below charts

Two side-by-side forms for managing money:

#### Deposit Form (Green)
- **Title**: 📥 Deposit Money
- **Amount Field**: 
  - Accepts positive numbers with decimals
  - Currency symbol ($) displayed
  - Placeholder: "0.00"
- **Description Field**: 
  - Optional text field
  - Example: "Salary deposit"
- **Button**: 💵 Deposit Now
  - Green gradient background
  - Disabled if account is blocked
  - Shows "⏳ Processing..." while loading

#### Withdraw Form (Red)
- **Title**: 📤 Withdraw Money
- **Amount Field**: 
  - Accepts positive numbers with decimals
  - Currency symbol ($) displayed
  - Placeholder: "0.00"
  - Validates against available balance
- **Description Field**: 
  - Optional text field
  - Example: "ATM withdrawal"
- **Button**: 💸 Withdraw Now
  - Red gradient background
  - Disabled if account is blocked or insufficient balance
  - Shows "⏳ Processing..." while loading

**Form Behavior**:
- Fields clear after successful transaction
- Success message appears at top
- Balance updates automatically
- Charts refresh with new data
- Account block status updates if applicable

### 7. Transaction History Section
**Location**: Bottom of dashboard

Detailed table of all transactions sorted by date (newest first):

#### Table Columns
1. **Date**: Transaction date and time (formatted)
2. **Type**: Transaction type badge
   - 📥 Green "Deposit" badge
   - 📤 Red "Withdrawal" badge
3. **Amount**: Transaction amount with sign
   - Green for deposits (+$)
   - Red for withdrawals (-$)
4. **Description**: User-provided transaction description or "-"

#### Table Features
- Hover effect: Rows highlight on hover
- Color coding: Deposits (green border), Withdrawals (red border)
- Empty state: "💤 No transactions yet" message
- Scrollable on mobile devices

## Interactive Features

### Real-time Updates
- Charts refresh after each transaction
- Statistics cards update immediately
- Balance reflects new amount
- Block status updates automatically

### Responsive Design
- **Desktop**: Full layout with 3-column charts, 2-column forms
- **Tablet**: Adaptive grid layout
- **Mobile**: Single column, stacked cards and charts

### Visual Feedback
- **Hover Effects**: Cards lift up with shadow
- **Focus States**: Input fields highlight in blue
- **Button States**: Disabled buttons appear faded
- **Animations**: Smooth transitions and slide-down alerts

### Data Validation
- Amount fields accept only positive numbers
- Forms prevent submission when blocked
- Withdrawal checks for sufficient balance
- Empty amount fields are required

## Understanding Transaction Blocking

### How It Works
1. After each transaction (deposit or withdrawal)
2. Your account is blocked for 2 business days
3. Weekends (Saturday & Sunday) are NOT counted
4. You cannot make another transaction until block expires

### Example Scenarios
- **Friday Transaction** → Blocked until Tuesday
- **Monday Transaction** → Blocked until Wednesday
- **Thursday Transaction** → Blocked until Monday (skips weekend)

### Block Status Indicator
- **Yellow Card**: Account is currently blocked
- **Unlock Date**: Shows exact date when you can transact
- **Countdown**: Displayed in block status card
- **Banner**: Warning message explains the block

## Tips for Using the Dashboard

### 1. Monitor Your Balance
- Check the purple Balance Card for current funds
- Use the Line Chart to see trends over time
- Plan withdrawals based on available balance

### 2. Track Spending Patterns
- **Pie Chart**: Understand your deposit/withdrawal ratio
- **Bar Chart**: See which months had most activity
- **Statistics**: Compare total deposits vs withdrawals

### 3. Plan Around Blocks
- Note the block expiration date after each transaction
- Plan your transactions to avoid the blocking period
- Check the warning banner before attempting a transaction

### 4. Add Descriptions
- Use description fields to categorize transactions
- Helpful for tracking different transaction types
- Appears in transaction history for reference

### 5. Mobile Usage
- Dashboard is fully responsive
- All features work on phones and tablets
- Touch-friendly buttons and form inputs
- Charts are interactive on all devices

## Troubleshooting

### Charts Not Showing Data
- **Solution**: You need at least one transaction to see charts
- **Action**: Make your first deposit or withdrawal

### Account is Blocked
- **Cause**: You made a transaction recently
- **Solution**: Wait until the blocked date passes
- **Note**: Weekends don't count toward the block
- **Status**: Check the yellow block status card for exact date

### Form Shows as Disabled
- **Cause**: Your account is blocked
- **Solution**: Wait for block to expire
- **Note**: Check block status card for date
- **Alternative**: Try depositing if block has expired

### Balance Not Updating
- **Solution**: Refresh the page (F5)
- **Action**: Check internet connection
- **Note**: Charts take a moment to recalculate

### Can't Withdraw Full Balance
- **Cause**: Insufficient funds
- **Solution**: Enter an amount less than current balance
- **Note**: Check the purple balance card for exact amount

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Tab | Navigate form fields |
| Enter | Submit form (Deposit/Withdraw) |
| Alt+L | Logout |

## Accessibility

- ✅ Color-blind friendly with icons (📥, 📤, 💰, etc.)
- ✅ Keyboard navigable
- ✅ Screen reader compatible
- ✅ High contrast text
- ✅ Clear error messages

## Performance Tips

- Dashboard loads transaction history on login
- Charts are computed efficiently with React
- Data caches in component state
- Updates trigger only after successful transactions
- Large transaction histories may take slightly longer to load

## Security Notes

- ⚠️ Your JWT token is stored securely in browser storage
- ⚠️ Logout clears all session data
- ⚠️ Don't share your login credentials
- ⚠️ Be cautious on public WiFi
- ⚠️ Refresh sensitive data after logout and re-login

## Feedback & Support

If you encounter any issues:
1. Check the error message at the top of the dashboard
2. Verify your internet connection
3. Try refreshing the page
4. Check if your account is blocked
5. Contact support if problems persist
