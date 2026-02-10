import { Request, Response } from 'express';
import { accountService } from '../services/accountService';

export class AccountController {
  /**
   * Get account details
   */
  async getAccount(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const account = await accountService.getAccount(userId);

      if (!account) {
        res.status(404).json({ error: 'Account not found' });
        return;
      }

      res.status(200).json(account);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Deposit money
   */
  async deposit(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const { amount, description } = req.body;

      if (!amount || amount <= 0) {
        res.status(400).json({ error: 'Valid amount is required' });
        return;
      }

      const transaction = await accountService.deposit(userId, amount, description || 'Deposit');
      res.status(200).json(transaction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Withdraw money
   */
  async withdraw(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const { amount, description } = req.body;

      if (!amount || amount <= 0) {
        res.status(400).json({ error: 'Valid amount is required' });
        return;
      }

      const transaction = await accountService.withdraw(userId, amount, description || 'Withdrawal');
      res.status(200).json(transaction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Get all transactions
   */
  async getTransactions(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const transactions = await accountService.getTransactions(userId);
      res.status(200).json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get transaction block status
   */
  async getBlockStatus(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const status = await accountService.getBlockStatus(userId);
      res.status(200).json(status);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get daily transaction limit status
   */
  async getDailyTransactionStatus(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const status = await accountService.getDailyTransactionStatus(userId);
      res.status(200).json(status);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const accountController = new AccountController();
