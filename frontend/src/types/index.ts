export interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
}

export interface Account {
  id: string;
  userId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  description: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface BlockStatus {
  isBlocked: boolean;
  blockedUntil?: string;
}
