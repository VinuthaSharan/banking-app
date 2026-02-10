# Daily Transaction Limit - Visual Testing Guide

## What You'll See on the Dashboard

### 1. NEW: Daily Transaction Limit Stat Card

Located in the stats cards section (top of dashboard), you'll see a new card:

```
┌─────────────────────────────┐
│ ⚡ Daily Transactions        │
│ 3/5                         │
│ 2 remaining                 │
└─────────────────────────────┘
```

**Card Changes Color Based on Usage:**

| Usage | Icon | Color | Background |
|-------|------|-------|------------|
| 0-3 txns | ⚡ | Blue | Light Blue |
| 4 txns | ⚠️ | Blue → Orange | Light Blue → Warning |
| 5 txns | ⛔ | Red | Light Red |

### 2. Status Indicators

**When Plenty of Transactions Remaining (0-3 used)**
```
Status: ⚡ Active
Count: 2/5
Remaining: 3 remaining ← Green text
```

**When Few Transactions Left (4 used)**
```
Status: ⚠️ Warning
Count: 4/5
Remaining: 1 remaining ← Orange text (bolder)
```

**When Limit Reached (5 used)**
```
Status: ⛔ Limit Reached
Count: 5/5
Remaining: Limit reached ← Red text (bolder)
```

### 3. Form Buttons

**BEFORE Limit Reached**
- ✅ "💵 Deposit Now" button → **ENABLED** (clickable, normal color)
- ✅ "💸 Withdraw Now" button → **ENABLED** (clickable, normal color)

**AFTER Limit Reached**
- ❌ "💵 Deposit Now" button → **DISABLED** (grayed out, not clickable)
- ❌ "💸 Withdraw Now" button → **DISABLED** (grayed out, not clickable)
- 💬 Hover shows tooltip: "Daily transaction limit reached"

### 4. Alert Messages

**When 4 Transactions Made**
```
┌────────────────────────────────────────┐
│ ⚠️ Warning: You have 1 transaction     │
│    remaining today.                    │
└────────────────────────────────────────┘
(Yellow/Orange background)
```

**When 5 Transactions Made**
```
┌────────────────────────────────────────┐
│ Daily Limit Reached! You have used all │
│ 5 allowed transactions for today.      │
│ Please try again tomorrow.             │
└────────────────────────────────────────┘
(Red background)
```

## Step-by-Step Test Flow

### Step 1: Open Dashboard with 0 Transactions Today
**Expected:**
- Daily Transaction card shows: "0/5 - 5 remaining" in blue
- Both Deposit and Withdraw buttons are **ENABLED**
- No alerts visible

### Step 2: Make 1st Transaction (Deposit $100)
**Expected:**
- Form submits successfully
- Success message: "Deposit successful!"
- Page refreshes/updates
- Daily Transaction card updates to: "1/5 - 4 remaining"
- Buttons remain **ENABLED**

### Step 3: Make 2nd, 3rd, 4th Transactions
**Expected:**
- Counter increments: "2/5 - 3 remaining", then "3/5 - 2 remaining", then "4/5 - 1 remaining"
- When you reach 4 transactions, **orange warning alert appears**:
  - "⚠️ Warning: You have 1 transaction remaining today."
- Buttons still **ENABLED**

### Step 4: Make 5th Transaction
**Expected:**
- Form submits successfully
- Success message displays
- Daily Transaction card updates to: "5/5 - 0 remaining"
- Card changes color to RED with ⛔ icon
- **Red error alert appears**: "Daily Limit Reached! You have used all 5 allowed transactions for today."
- Both Deposit and Withdraw buttons become **DISABLED** (grayed out)

### Step 5: Try to Make 6th Transaction
**Expected:**
- Click on Deposit or Withdraw button → **Nothing happens** (button is disabled)
- Amount input field won't accept focus when button is disabled
- Hover over button shows tooltip: "Daily transaction limit reached"
- Page shows both the error alert AND the disabled stat card

### Step 6: Navigate Away and Back to Dashboard
**Expected:**
- Daily Transaction card still shows "5/5 - 0 remaining"
- Buttons still disabled
- Red alert still visible
- All data persists correctly

### Step 7: Wait Until Next Day (or Simulate)
**Expected:**
- At midnight (00:00 UTC), the counter automatically resets
- Daily Transaction card shows: "0/5 - 5 remaining" in blue
- Buttons are **ENABLED** again
- Alerts disappear
- User can make 5 new transactions

## Backend Validation Test

### To Verify Backend is Also Validating:

1. Open Developer Tools (F12)
2. Go to Network tab
3. Make 5 transactions (watch requests)
4. Try to make 6th transaction with disabled button
5. Check the API response for `/account/daily-transactions`

**Expected Network Response:**
```json
{
  "dailyCount": 5,
  "dailyLimit": 5,
  "remainingToday": 0
}
```

### To Test Backend Directly (Advanced)

Open browser console and run:
```javascript
// Get your auth token first
const token = localStorage.getItem('authToken');

// Call the API
fetch('http://localhost:5000/api/account/daily-transactions', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

**Expected output:**
```
{dailyCount: 5, dailyLimit: 5, remainingToday: 0}
```

## Styling Verification

### Stat Card Styling

**Check the stat card has:**
- ✅ Left border (5px solid color)
- ✅ Blue background when count < 4
- ✅ Red background when count >= 5
- ✅ Card has rounded corners
- ✅ Shadow effect on hover
- ✅ Emoji icons that change based on state

**Text Styling:**
- ✅ Large number "X/5" (size 28px, bold)
- ✅ Small label "Daily Transactions"
- ✅ Status text color changes with state

## Error Cases to Test

### What Happens If:

**1. Network Error When Fetching Daily Status**
- Expected: "Failed to load account data" error displayed
- Buttons become disabled (fail-safe)
- User cannot make transactions

**2. User in Multiple Browser Windows**
- Expected: Limit enforced in both windows
- Make 5 txns in Window A → Window B should also show limit reached
- Refresh Window B → Shows limit is reached
- *This happens because backend tracks the actual data*

**3. User Tries to Bypass Frontend**
- Expected: Fails because backend validates
- Browser dev tools → Network → Try to submit disabled form anyway
- Backend returns: `"Daily transaction limit reached (5 transactions per day)"`

## Color Reference

### CSS Color Codes Used

```css
/* Available/Green State */
Border: #3b82f6 (Blue)
Background: Light blue gradient
Text: #3b82f6
Remaining text: #10b981 (Green)

/* Warning/Orange State */
Border: #3b82f6 (Blue) → Changes when exactly 1 remaining
Remaining text: #f59e0b (Orange)

/* Limit Reached/Red State */
Border: #ef4444 (Red)
Background: Light red gradient  
Text: #dc2626 (Dark Red)
Remaining text: #ef4444 (Red)
```

## Responsive Design Check

The stat card should look good on:
- ✅ Desktop (1920px wide)
- ✅ Tablet (768px wide)
- ✅ Mobile (375px wide)

Card uses `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`
So it will stack nicely on smaller screens.

## Summary Checklist

### Must Work:
- [ ] Daily count displays correctly (X/5)
- [ ] Remaining count displays correctly (Y remaining)
- [ ] Buttons disable at limit
- [ ] Alerts appear at correct thresholds (4 and 5)
- [ ] Colors change based on count
- [ ] Counter resets at midnight

### Nice to Have:
- [ ] Card animates when changed
- [ ] Tooltip appears on disabled button
- [ ] Data persists on refresh
- [ ] Works across multiple tabs/windows

## If Something Looks Wrong

**Issue: Stat card shows wrong number**
- Check: Network tab, API response for `/account/daily-transactions`
- Check: Browser console for JavaScript errors

**Issue: Buttons not disabled at limit**
- Check: Console for `dailyCount >= 5` logic
- Check: Button has `disabled` attribute

**Issue: Alerts not showing**
- Check: Console for React errors
- Check: `dailyCount >= 4` and `dailyCount >= 5` conditions

**Issue: Colors not changing**
- Check: CSS file loaded correctly
- Check: Classes `.limit-card-active` and `.limit-remaining` applied

Good luck testing! 🚀
