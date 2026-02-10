export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  description: string;
  createdAt: string;
}

export interface Account {
  id: string;
  userId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionBlock {
  userId: string;
  blockedUntil: string;
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthPayload {
  fullName: string;
}
