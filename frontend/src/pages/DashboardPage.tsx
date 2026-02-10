import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { accountAPI } from '../services/api';
import { Account, Transaction, BlockStatus } from '../types/index';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import '../styles/dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

interface MonthlyData {
  month: string;
  deposits: number;
  withdrawals: number;
  balance: number;
}

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [blockStatus, setBlockStatus] = useState<BlockStatus | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositDescription, setDepositDescription] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawDescription, setWithdrawDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const [remainingToday, setRemainingToday] = useState(5);

  useEffect(() => {
    loadAccountData();
  }, []);

  const loadAccountData = async () => {
    try {
      const [accountData, txnData, blockData, dailyData] = await Promise.all([
        accountAPI.getAccount(),
        accountAPI.getTransactions(),
        accountAPI.getBlockStatus(),
        accountAPI.getDailyTransactionStatus()
      ]);
      setAccount(accountData);
      setTransactions(txnData);
      setBlockStatus(blockData);
      setDailyCount(dailyData.dailyCount);
      setRemainingToday(dailyData.remainingToday);
      calculateMonthlyData(txnData);
    } catch (err: any) {
      setError('Failed to load account data');
    }
  };

  const calculateMonthlyData = (txns: Transaction[]) => {
    const monthMap = new Map<string, { deposits: number; withdrawals: number }>();

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      monthMap.set(monthKey, { deposits: 0, withdrawals: 0 });
    }

    // Populate with actual data
    txns.forEach((txn) => {
      const txnDate = new Date(txn.createdAt);
      const monthKey = txnDate.toLocaleString('default', { month: 'short', year: 'numeric' });
      const current = monthMap.get(monthKey) || { deposits: 0, withdrawals: 0 };

      if (txn.type === 'deposit') {
        current.deposits += txn.amount;
      } else {
        current.withdrawals += txn.amount;
      }
      monthMap.set(monthKey, current);
    });

    const data = Array.from(monthMap.entries()).map(([month, { deposits, withdrawals }]) => ({
      month,
      deposits,
      withdrawals,
      balance: deposits - withdrawals
    }));

    setMonthlyData(data);
    
    // Calculate totals
    const totalDep = txns.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0);
    const totalWth = txns.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0);
    setTotalDeposits(totalDep);
    setTotalWithdrawals(totalWth);
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositAmount) return;

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await accountAPI.deposit(parseFloat(depositAmount), depositDescription);
      setDepositAmount('');
      setDepositDescription('');
      setSuccess('✅ Deposit successful! Your balance has been updated.');
      await loadAccountData();
      // Keep success message visible for 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (err: any) {
      setError('❌ ' + (err.response?.data?.error || 'Deposit failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount) return;

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await accountAPI.withdraw(parseFloat(withdrawAmount), withdrawDescription);
      setWithdrawAmount('');
      setWithdrawDescription('');
      setSuccess('✅ Withdrawal successful! Your balance has been updated.');
      await loadAccountData();
      // Keep success message visible for 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (err: any) {
      setError('❌ ' + (err.response?.data?.error || 'Withdrawal failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!account) {
    return <div className="loading">Loading...</div>;
  }

  const pieChartData = {
    labels: ['Deposits', 'Withdrawals'],
    datasets: [{
      data: [totalDeposits, totalWithdrawals],
      backgroundColor: ['#10b981', '#ef4444'],
      borderColor: ['#059669', '#dc2626'],
      borderWidth: 2
    }]
  };

  const barChartData = {
    labels: monthlyData.map(m => m.month),
    datasets: [
      {
        label: 'Deposits',
        data: monthlyData.map(m => m.deposits),
        backgroundColor: '#10b981',
        borderColor: '#059669',
        borderWidth: 1
      },
      {
        label: 'Withdrawals',
        data: monthlyData.map(m => m.withdrawals),
        backgroundColor: '#ef4444',
        borderColor: '#dc2626',
        borderWidth: 1
      }
    ]
  };

  const lineChartData = {
    labels: monthlyData.map(m => m.month),
    datasets: [{
      label: 'Balance',
      data: monthlyData.map(m => m.balance),
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4
    }]
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>💳 Banking Dashboard</h1>
          <p className="header-subtitle">Manage your account with ease</p>
        </div>
        <div className="header-right">
          <div className="user-profile">
            <div className="avatar">{user?.fullName?.charAt(0)?.toUpperCase()}</div>
            <div className="user-info">
              <p className="user-name">{user?.fullName}</p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Alert Messages */}
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Top Stats Cards */}
        <section className="stats-cards">
          <div className="stat-card balance-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <p className="stat-label">Current Balance</p>
              <p className="stat-value">${account.balance.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card deposits-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <p className="stat-label">Total Deposits</p>
              <p className="stat-value">${totalDeposits.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card withdrawals-card">
            <div className="stat-icon">📉</div>
            <div className="stat-content">
              <p className="stat-label">Total Withdrawals</p>
              <p className="stat-value">${totalWithdrawals.toFixed(2)}</p>
            </div>
          </div>

          <div className={`stat-card ${blockStatus?.isBlocked ? 'block-card-active' : 'block-card'}`}>
            <div className="stat-icon">{blockStatus?.isBlocked ? '🔒' : '🔓'}</div>
            <div className="stat-content">
              <p className="stat-label">Block Status</p>
              <p className="stat-value">
                {blockStatus?.isBlocked ? 'Blocked' : 'Active'}
              </p>
              {blockStatus?.isBlocked && (
                <p className="block-date">Until: {blockStatus.blockedUntil}</p>
              )}
            </div>
          </div>

          <div className={`stat-card ${dailyCount >= 5 ? 'limit-card-active' : 'limit-card'}`}>
            <div className="stat-icon">{dailyCount >= 5 ? '⛔' : '⚡'}</div>
            <div className="stat-content">
              <p className="stat-label">Daily Transactions</p>
              <p className="stat-value">{dailyCount}/5</p>
              <p className={`limit-remaining ${dailyCount >= 5 ? 'limit-reached' : dailyCount >= 4 ? 'limit-warning' : 'limit-ok'}`}>
                {remainingToday > 0 ? `${remainingToday} remaining` : 'Limit reached'}
              </p>
            </div>
          </div>
        </section>

        {/* Block Warning */}
        {blockStatus?.isBlocked && (
          <div className="block-warning-banner">
            <span className="warning-icon">⚠️</span>
            <div className="warning-content">
              <strong>Your account is currently blocked</strong>
              <p>You cannot make transactions until {blockStatus.blockedUntil}</p>
              <small>(Weekends are excluded from the blocking period)</small>
            </div>
          </div>
        )}

        {/* Charts Section */}
        <section className="charts-section">
          <div className="chart-container">
            <div className="chart-card">
              <h3>💵 Deposits vs Withdrawals</h3>
              {transactions.length > 0 ? (
                <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: true }} />
              ) : (
                <p className="no-data">No transaction data yet</p>
              )}
            </div>

            <div className="chart-card">
              <h3>📊 Monthly Transaction Trends</h3>
              {monthlyData.length > 0 ? (
                <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: true }} />
              ) : (
                <p className="no-data">No monthly data yet</p>
              )}
            </div>

            <div className="chart-card">
              <h3>📈 Balance Over Time</h3>
              {monthlyData.length > 0 ? (
                <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: true }} />
              ) : (
                <p className="no-data">No balance history yet</p>
              )}
            </div>
          </div>
        </section>

        {/* Transaction Forms */}
        <section className="transaction-section">
          <h2>💸 Make a Transaction</h2>
          {dailyCount >= 5 && (
            <div className="alert alert-error" style={{ marginBottom: '20px' }}>
              <strong>Daily Limit Reached!</strong> You have used all 5 allowed transactions for today. Please try again tomorrow.
            </div>
          )}
          {dailyCount >= 4 && dailyCount < 5 && (
            <div className="alert alert-warning" style={{ marginBottom: '20px', backgroundColor: '#fef3c7', borderColor: '#fbbf24', color: '#92400e' }}>
              <strong>⚠️ Warning:</strong> You have {remainingToday} transaction remaining today.
            </div>
          )}
          <div className="transaction-forms">
            <form onSubmit={handleDeposit} className="transaction-form deposit-form">
              <div className="form-header">
                <h3>📥 Deposit Money</h3>
              </div>
              <div className="form-group">
                <label htmlFor="deposit-amount">Amount *</label>
                <div className="input-wrapper">
                  <span className="currency-symbol">$</span>
                  <input
                    id="deposit-amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="deposit-desc">Description</label>
                <input
                  id="deposit-desc"
                  type="text"
                  value={depositDescription}
                  onChange={(e) => setDepositDescription(e.target.value)}
                  placeholder="e.g., Salary deposit"
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoading || blockStatus?.isBlocked || dailyCount >= 5}
                className="btn-deposit"
                title={dailyCount >= 5 ? "Daily transaction limit reached" : ""}
              >
                {isLoading ? '⏳ Processing...' : '💵 Deposit Now'}
              </button>
            </form>

            <form onSubmit={handleWithdraw} className="transaction-form withdraw-form">
              <div className="form-header">
                <h3>📤 Withdraw Money</h3>
              </div>
              <div className="form-group">
                <label htmlFor="withdraw-amount">Amount *</label>
                <div className="input-wrapper">
                  <span className="currency-symbol">$</span>
                  <input
                    id="withdraw-amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="withdraw-desc">Description</label>
                <input
                  id="withdraw-desc"
                  type="text"
                  value={withdrawDescription}
                  onChange={(e) => setWithdrawDescription(e.target.value)}
                  placeholder="e.g., ATM withdrawal"
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoading || blockStatus?.isBlocked || dailyCount >= 5}
                className="btn-withdraw"
                title={dailyCount >= 5 ? "Daily transaction limit reached" : ""}
              >
                {isLoading ? '⏳ Processing...' : '💸 Withdraw Now'}
              </button>
            </form>
          </div>
        </section>

        {/* Transaction History */}
        <section className="transactions-history">
          <h2>📋 Transaction History</h2>
          {transactions.length === 0 ? (
            <div className="no-transactions">
              <p>💤 No transactions yet</p>
              <small>Make your first deposit or withdrawal to see it here</small>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id} className={`txn-${txn.type}`}>
                      <td className="txn-date">
                        {new Date(txn.createdAt).toLocaleDateString()} 
                        <br/>
                        <small>{new Date(txn.createdAt).toLocaleTimeString()}</small>
                      </td>
                      <td className="txn-type">
                        <span className={`type-badge ${txn.type}`}>
                          {txn.type === 'deposit' ? '📥 Deposit' : '📤 Withdrawal'}
                        </span>
                      </td>
                      <td className={`txn-amount ${txn.type}`}>
                        <strong>
                          {txn.type === 'deposit' ? '+' : '-'}${txn.amount.toFixed(2)}
                        </strong>
                      </td>
                      <td className="txn-description">{txn.description || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
