import sqlite3 from 'sqlite3';
import path from 'path';
import { User, Transaction, Account, TransactionBlock } from '../types/index';
import { v4 as uuidv4 } from 'uuid';

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../database.sqlite');

class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(dbPath);
    this.initializeDatabase();
  }

  private initializeDatabase(): void {
    this.db.serialize(() => {
      // Users table
      this.db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          fullName TEXT NOT NULL,
          createdAt TEXT NOT NULL
        )
      `);

      // Accounts table
      this.db.run(`
        CREATE TABLE IF NOT EXISTS accounts (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          balance REAL NOT NULL DEFAULT 0,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL,
          FOREIGN KEY (userId) REFERENCES users(id)
        )
      `);

      // Transactions table
      this.db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          amount REAL NOT NULL,
          type TEXT NOT NULL,
          description TEXT,
          createdAt TEXT NOT NULL,
          FOREIGN KEY (userId) REFERENCES users(id)
        )
      `);

      // Transaction blocks table
      this.db.run(`
        CREATE TABLE IF NOT EXISTS transactionBlocks (
          userId TEXT PRIMARY KEY,
          blockedUntil TEXT NOT NULL,
          FOREIGN KEY (userId) REFERENCES users(id)
        )
      `);
    });
  }

  // User operations
  createUser(user: Omit<User, 'id'>): Promise<User> {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const { email, password, fullName, createdAt } = user;
      this.db.run(
        `INSERT INTO users (id, email, password, fullName, createdAt) VALUES (?, ?, ?, ?, ?)`,
        [id, email, password, fullName, createdAt],
        function (err) {
          if (err) reject(err);
          else resolve({ id, email, password, fullName, createdAt });
        }
      );
    });
  }

  getUserByEmail(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row: any) => {
        if (err) reject(err);
        else resolve(row || null);
      });
    });
  }

  getUserById(id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row: any) => {
        if (err) reject(err);
        else resolve(row || null);
      });
    });
  }

  // Account operations
  createAccount(userId: string): Promise<Account> {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const now = new Date().toISOString();
      this.db.run(
        `INSERT INTO accounts (id, userId, balance, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`,
        [id, userId, 0, now, now],
        function (err) {
          if (err) reject(err);
          else resolve({ id, userId, balance: 0, createdAt: now, updatedAt: now });
        }
      );
    });
  }

  getAccountByUserId(userId: string): Promise<Account | null> {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM accounts WHERE userId = ?`,
        [userId],
        (err, row: any) => {
          if (err) reject(err);
          else resolve(row || null);
        }
      );
    });
  }

  updateAccountBalance(userId: string, newBalance: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const now = new Date().toISOString();
      this.db.run(
        `UPDATE accounts SET balance = ?, updatedAt = ? WHERE userId = ?`,
        [newBalance, now, userId],
        function (err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  // Transaction operations
  createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const { userId, amount, type, description, createdAt } = transaction;
      this.db.run(
        `INSERT INTO transactions (id, userId, amount, type, description, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, userId, amount, type, description, createdAt],
        function (err) {
          if (err) reject(err);
          else
            resolve({
              id,
              userId,
              amount,
              type,
              description,
              createdAt
            });
        }
      );
    });
  }

  getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM transactions WHERE userId = ? ORDER BY createdAt DESC`,
        [userId],
        (err, rows: any[]) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  }

  // Transaction block operations
  setTransactionBlock(userId: string, blockedUntil: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT OR REPLACE INTO transactionBlocks (userId, blockedUntil) VALUES (?, ?)`,
        [userId, blockedUntil],
        function (err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  getTransactionBlock(userId: string): Promise<TransactionBlock | null> {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM transactionBlocks WHERE userId = ?`,
        [userId],
        (err, row: any) => {
          if (err) reject(err);
          else resolve(row || null);
        }
      );
    });
  }

  removeTransactionBlock(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `DELETE FROM transactionBlocks WHERE userId = ?`,
        [userId],
        function (err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

export const database = new Database();
