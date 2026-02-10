import { database } from '../models/database';
import { Account, Transaction } from '../types/index';

export class AccountService {
  /**
   * Get count of transactions made today by a user
   */
  private async getTransactionCountToday(userId: string): Promise<number> {
    const transactions = await database.getTransactionsByUserId(userId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return transactions.filter(txn => {
      const txnDate = new Date(txn.createdAt);
      txnDate.setHours(0, 0, 0, 0);
      return txnDate.getTime() === today.getTime();
    }).length;
  }

  /**
   * Get account details for a user
   */
  async getAccount(userId: string): Promise<Account | null> {
    return database.getAccountByUserId(userId);
  }

  /**
   * Deposit money to account
   */
  async deposit(userId: string, amount: number, description: string): Promise<Transaction> {
    // Check daily transaction limit (5 per day)
    const dailyCount = await this.getTransactionCountToday(userId);
    if (dailyCount >= 5) {
      throw new Error('Daily transaction limit reached (5 transactions per day)');
    }

    // Get current account
    const account = await database.getAccountByUserId(userId);
    if (!account) {
      throw new Error('Account not found');
    }

    // Update balance
    const newBalance = account.balance + amount;
    await database.updateAccountBalance(userId, newBalance);

    // Create transaction record
    const transaction = await database.createTransaction({
      userId,
      amount,
      type: 'deposit',
      description,
      createdAt: new Date().toISOString()
    });

    return transaction;
  }

  /**
   * Withdraw money from account
   */
  async withdraw(userId: string, amount: number, description: string): Promise<Transaction> {
    // Check daily transaction limit (5 per day)
    const dailyCount = await this.getTransactionCountToday(userId);
    if (dailyCount >= 5) {
      throw new Error('Daily transaction limit reached (5 transactions per day)');
    }

    // Get current account
    const account = await database.getAccountByUserId(userId);
    if (!account) {
      throw new Error('Account not found');
    }

    // Check sufficient balance
    if (account.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // Update balance
    const newBalance = account.balance - amount;
    await database.updateAccountBalance(userId, newBalance);

    // Create transaction record
    const transaction = await database.createTransaction({
      userId,
      amount,
      type: 'withdrawal',
      description,
      createdAt: new Date().toISOString()
    });

    return transaction;
  }

  /**
   * Get all transactions for a user
   */
  async getTransactions(userId: string): Promise<Transaction[]> {
    return database.getTransactionsByUserId(userId);
  }

  /**
   * Get transaction block status for a user
   * Note: Block system has been replaced with daily transaction limit
   * This method is kept for backward compatibility
   */
  async getBlockStatus(userId: string): Promise<{ isBlocked: boolean; blockedUntil?: string }> {
    // Daily transaction limit is now the only restriction
    // Users are never "blocked" - they just can't make more than 5 transactions per day
    return { isBlocked: false };
  }

  /**
   * Get daily transaction limit status
   */
  async getDailyTransactionStatus(userId: string): Promise<{ dailyCount: number; dailyLimit: number; remainingToday: number }> {
    const dailyCount = await this.getTransactionCountToday(userId);
    const dailyLimit = 5;
    const remainingToday = Math.max(0, dailyLimit - dailyCount);

    return {
      dailyCount,
      dailyLimit,
      remainingToday
    };
  }
}

export const accountService = new AccountService();
