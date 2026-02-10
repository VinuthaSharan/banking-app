# Dashboard Visual Reference Guide

## 🎨 Dashboard Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                      DASHBOARD HEADER                           │
│  💳 Banking Dashboard     👤 John Doe - john@example.com [Logout]│
├─────────────────────────────────────────────────────────────────┤
│                    ALERT MESSAGES (if any)                       │
│  ✅ Deposit successful! / ❌ Error message                        │
├─────────────────────────────────────────────────────────────────┤
│                    STATISTICS CARDS (4 columns)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────┐│
│  │ 💰 Balance  │  │ 📈 Deposits │  │ 📉 Withdraw │  │ 🔓 Block │
│  │ $2,500.00   │  │ $5,000.00   │  │ $2,500.00   │  │ Active  ││
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────┘│
├─────────────────────────────────────────────────────────────────┤
│              BLOCK WARNING BANNER (if blocked)                   │
│  ⚠️ Account is blocked until 2024-01-20 (weekends excluded)    │
├─────────────────────────────────────────────────────────────────┤
│                  ANALYTICS CHARTS (3 columns)                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│  │ 💵 Deposits  │ │ 📊 Monthly   │ │ 📈 Balance   │             │
│  │ vs Withdraws │ │ Trends       │ │ Over Time    │             │
│  │              │ │              │ │              │             │
│  │  [PIE CHART] │ │ [BAR CHART]  │ │ [LINE CHART] │             │
│  │              │ │              │ │              │             │
│  └──────────────┘ └──────────────┘ └──────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│               TRANSACTION FORMS (2 columns)                      │
│  ┌────────────────────┐  ┌────────────────────┐                │
│  │ 📥 Deposit Money   │  │ 📤 Withdraw Money  │                │
│  ├────────────────────┤  ├────────────────────┤                │
│  │ Amount: $_________ │  │ Amount: $_________ │                │
│  │ Desc:  __________ │  │ Desc:  __________ │                │
│  │ [💵 Deposit Now]   │  │ [💸 Withdraw Now]  │                │
│  └────────────────────┘  └────────────────────┘                │
├─────────────────────────────────────────────────────────────────┤
│               TRANSACTION HISTORY                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Date          │ Type      │ Amount    │ Description       │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │ 2024-01-15    │ 📥 Deposit│ +$500.00  │ Initial deposit   │  │
│  │ 2024-01-20    │ 📤 Withdra│ -$100.00  │ ATM withdrawal    │  │
│  │ 2024-01-25    │ 📥 Deposit│ +$250.00  │ Salary            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📱 Responsive Breakpoints

### Desktop (1920px and above)
```
Full 4-column stat cards
3-column charts (side by side)
2-column forms (side by side)
Full-width transaction table
```

### Laptop (1366px - 1919px)
```
Full 4-column stat cards
2-column charts + 1 row
2-column forms
Full-width transaction table
```

### Tablet (768px - 1365px)
```
2x2 grid stat cards
Single column charts (stacked)
Single column forms (stacked)
Full-width transaction table
```

### Mobile (375px - 767px)
```
Single column stat cards
Single column charts
Single column forms
Scrollable transaction table
```

---

## 🎨 Color Reference

### Primary Colors
```
┌─────────────┬──────────────┬─────────────┐
│ Color       │ Hex Code     │ Usage       │
├─────────────┼──────────────┼─────────────┤
│ Purple      │ #667eea      │ Primary     │
│ Dark Purple │ #764ba2      │ Gradients   │
│ Green       │ #10b981      │ Success/Dep │
│ Dark Green  │ #059669      │ Deposits    │
│ Red         │ #ef4444      │ Danger/Wtd  │
│ Dark Red    │ #dc2626      │ Withdrawals │
│ Yellow      │ #fbbf24      │ Warning     │
└─────────────┴──────────────┴─────────────┘
```

### Text Colors
```
┌──────────────┬──────────────┬─────────────────┐
│ Element      │ Hex Code     │ Purpose         │
├──────────────┼──────────────┼─────────────────┤
│ Headings     │ #333333      │ Main titles     │
│ Body Text    │ #666666      │ Descriptions    │
│ Light Text   │ #999999      │ Metadata        │
│ Disabled     │ #cccccc      │ Disabled state  │
│ White        │ #ffffff      │ Backgrounds     │
└──────────────┴──────────────┴─────────────────┘
```

### Background Colors
```
┌────────────────┬──────────────┬──────────────┐
│ Element        │ Color        │ Location     │
├────────────────┼──────────────┼──────────────┤
│ Page BG        │ #f5f7fa      │ Body         │
│ Cards          │ #ffffff      │ Sections     │
│ Forms          │ #f9fafb      │ Input areas  │
│ Hover States   │ #f3f4f6      │ Interactive  │
│ Borders        │ #e5e7eb      │ Separators   │
└────────────────┴──────────────┴──────────────┘
```

---

## 📊 Chart Specifications

### Pie Chart
```
Title: 💵 Deposits vs Withdrawals

[COLORED PIE CHART]
Segments:
├─ Green Segment: Deposits (% of total)
└─ Red Segment: Withdrawals (% of total)

Legend:
├─ ■ Deposits
└─ ■ Withdrawals

Colors:
├─ Green: #10b981 (border #059669)
└─ Red: #ef4444 (border #dc2626)
```

### Bar Chart
```
Title: 📊 Monthly Transaction Trends

[BAR CHART]
X-Axis: Jan, Feb, Mar, Apr, May, Jun
Y-Axis: Amount ($)

Bars per Month:
├─ Green: Deposits
└─ Red: Withdrawals

Colors:
├─ Green: #10b981
└─ Red: #ef4444
```

### Line Chart
```
Title: 📈 Balance Over Time

[LINE CHART]
X-Axis: Jan, Feb, Mar, Apr, May, Jun
Y-Axis: Balance ($)

Line:
├─ Color: #667eea
├─ Thickness: 3px
├─ Fill: Light purple (#667eea 10% opacity)
└─ Curve: Smooth (tension 0.4)
```

---

## 🎯 Component Specifications

### Stat Cards

#### Balance Card (Purple)
```
┌─────────────────────────┐
│ 💰                      │
│ Current Balance         │
│ $2,500.00              │
└─────────────────────────┘
Border-Left: 5px solid #667eea
Background: White
Hover: Lift up 5px, enhanced shadow
```

#### Deposits Card (Green)
```
┌─────────────────────────┐
│ 📈                      │
│ Total Deposits          │
│ $5,000.00              │
└─────────────────────────┘
Border-Left: 5px solid #10b981
Background: White
Hover: Lift up 5px, enhanced shadow
```

#### Withdrawals Card (Red)
```
┌─────────────────────────┐
│ 📉                      │
│ Total Withdrawals       │
│ $2,500.00              │
└─────────────────────────┘
Border-Left: 5px solid #ef4444
Background: White
Hover: Lift up 5px, enhanced shadow
```

#### Block Status Card
```
When Active (Green):
┌─────────────────────────┐
│ 🔓                      │
│ Block Status            │
│ Active                  │
└─────────────────────────┘
Border-Left: 5px solid #10b981
Background: #d1fae5 gradient

When Blocked (Yellow):
┌─────────────────────────┐
│ 🔒                      │
│ Block Status            │
│ Blocked                 │
│ Until: 2024-01-20      │
└─────────────────────────┘
Border-Left: 5px solid #fbbf24
Background: #fef3c7 gradient
```

---

## 📝 Form Specifications

### Deposit Form
```
┌──────────────────────────┐
│ 📥 Deposit Money         │
├──────────────────────────┤
│ Amount *                 │
│ [$_________ (0.00)]      │
│                          │
│ Description              │
│ [_____________________]  │
│                          │
│ [💵 Deposit Now]         │
└──────────────────────────┘
Border-Left: 5px solid #10b981
Background: #f9fafb
Button Color: #10b981 gradient
```

### Withdraw Form
```
┌──────────────────────────┐
│ 📤 Withdraw Money        │
├──────────────────────────┤
│ Amount *                 │
│ [$_________ (0.00)]      │
│                          │
│ Description              │
│ [_____________________]  │
│                          │
│ [💸 Withdraw Now]        │
└──────────────────────────┘
Border-Left: 5px solid #ef4444
Background: #f9fafb
Button Color: #ef4444 gradient
```

---

## 🔔 Alert Messages

### Success Alert
```
┌─────────────────────────────────────────┐
│ ✅ Deposit successful!                  │
│ (Green background, auto-disappears 3s)  │
└─────────────────────────────────────────┘
Background: #d1fae5
Border-Left: 5px solid #10b981
Text Color: #065f46
Animation: Slide down
```

### Error Alert
```
┌─────────────────────────────────────────┐
│ ❌ Insufficient balance                 │
│ (Red background, manual dismiss)        │
└─────────────────────────────────────────┘
Background: #fee2e2
Border-Left: 5px solid #ef4444
Text Color: #7c2d12
```

---

## 📱 Mobile Layout

### Mobile Portrait (375px)
```
┌──────────────────┐
│    HEADER        │  (Stacked)
│  [User Avatar]   │
│   [User Name]    │
│    [Logout]      │
├──────────────────┤
│   ALERT (if)     │
├──────────────────┤
│ STAT CARDS (1x)  │  (Stacked vertically)
│   Card 1         │
│   Card 2         │
│   Card 3         │
│   Card 4         │
├──────────────────┤
│ WARNING (if)     │
├──────────────────┤
│   CHART 1        │
├──────────────────┤
│   CHART 2        │
├──────────────────┤
│   CHART 3        │
├──────────────────┤
│ FORM 1 (Deposit) │
├──────────────────┤
│ FORM 2 (Withdraw)│
├──────────────────┤
│   HISTORY TABLE  │
│   (Scrollable)   │
└──────────────────┘
```

---

## 🎭 Interactive States

### Button States

#### Default (Enabled)
```
┌──────────────────┐
│ 💵 Deposit Now   │
└──────────────────┘
Background: Green gradient
Cursor: pointer
Box-shadow: None
```

#### Hover (Enabled)
```
┌──────────────────┐
│ 💵 Deposit Now   │  ↑ (lifted up 3px)
└──────────────────┘
Background: Green gradient
Cursor: pointer
Box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3)
Transform: translateY(-3px)
```

#### Loading (Disabled)
```
┌──────────────────┐
│ ⏳ Processing... │
└──────────────────┘
Background: Green gradient (60% opacity)
Cursor: not-allowed
Disabled: true
```

#### Blocked (Disabled)
```
┌──────────────────┐
│ 💵 Deposit Now   │
└──────────────────┘
Background: Green gradient (60% opacity)
Cursor: not-allowed
Disabled: true
Reason: Account is blocked
```

### Input States

#### Default
```
[________________]
Border: 2px solid #e5e7eb
Background: White
Focus: None
```

#### Focused
```
[████████████████]  ← Blue glow
Border: 2px solid #667eea
Background: White
Box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1)
```

#### Filled
```
[$500.00________]
Border: 2px solid #e5e7eb
Background: White
Color: #333333
```

---

## 🏠 Header Layout

### Desktop View
```
┌────────────────────────────────────────────────────┐
│  💳 Banking Dashboard           User [Profile] [x] │
│  Manage your account with ease                     │
└────────────────────────────────────────────────────┘
```

### Mobile View
```
┌──────────────────────────┐
│  💳 Banking Dashboard    │
│  Manage your account...  │
├──────────────────────────┤
│ 👤 John Doe              │
│    john@example.com      │
├──────────────────────────┤
│   [Logout Button]        │
└──────────────────────────┘
```

---

## 📏 Spacing & Sizing

### Padding Sizes
```
┌───────┬─────────┐
│ XS    │ 5px     │
│ S     │ 10px    │
│ M     │ 15px    │
│ L     │ 20px    │
│ XL    │ 25px    │
│ 2XL   │ 30px    │
│ 3XL   │ 40px    │
└───────┴─────────┘
```

### Gap Sizes
```
Cards: 20px
Sections: 35px
Form fields: 18px
Headers: 20-25px
```

### Font Sizes
```
H1 (Title): 32px
H2 (Section): 22px
H3 (Subsection): 18px
Body: 14-16px
Label: 14px
Small: 12px
```

---

## ✨ Animation Reference

### Slide Down (Alerts)
```
From: opacity 0, translateY -10px
To: opacity 1, translateY 0
Duration: 300ms
Easing: ease
```

### Lift Effect (Cards)
```
On Hover:
Transform: translateY(-5px)
Box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12)
Duration: 300ms
```

### Button Press
```
Default: translateY(0)
Hover: translateY(-3px)
Disabled: translateY(0)
Duration: 200ms
```

---

## 🎯 Typography Hierarchy

```
Main Title (H1)
└─ 32px, 700 weight, #333
   └─ Subtitle
      └─ 14px, 400 weight, #666

Section Title (H2)
└─ 22px, 700 weight, #333

Subsection (H3)
└─ 18px, 700 weight, #333

Body Text
└─ 16px, 400 weight, #666

Label Text
└─ 14px, 600 weight, #333

Small Text
└─ 12px, 400 weight, #999
```

---

## 🔍 Accessibility Features

### Color Accessibility
- ✅ Sufficient contrast ratios (WCAG AA)
- ✅ Icons in addition to colors
- ✅ Text descriptions for all states
- ✅ Color-blind friendly palette

### Keyboard Navigation
```
Tab:     Navigate elements
Enter:   Submit forms, activate buttons
Shift+Tab: Navigate backwards
Escape:  (Could close modals if added)
```

### Focus Indicators
```
Buttons: Box-shadow with blue tint
Inputs: Border color change to blue
Links: (If added) Underline on focus
Cards: (Optional) Border highlight
```

---

This visual reference guide helps understand the exact appearance and behavior of all dashboard elements. Use it during development, testing, and maintenance.

**Happy Designing! 🎨**
