import axios from 'axios';
import { User, Account, Transaction, AuthResponse, BlockStatus } from '../types/index';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { email, password, fullName });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }
};

export const accountAPI = {
  getAccount: async (): Promise<Account> => {
    const response = await api.get('/account/details');
    return response.data;
  },

  deposit: async (amount: number, description?: string): Promise<Transaction> => {
    const response = await api.post('/account/deposit', { amount, description });
    return response.data;
  },

  withdraw: async (amount: number, description?: string): Promise<Transaction> => {
    const response = await api.post('/account/withdraw', { amount, description });
    return response.data;
  },

  getTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get('/account/transactions');
    return response.data;
  },

  getBlockStatus: async (): Promise<BlockStatus> => {
    const response = await api.get('/account/block-status');
    return response.data;
  },

  getDailyTransactionStatus: async (): Promise<{ dailyCount: number; dailyLimit: number; remainingToday: number }> => {
    const response = await api.get('/account/daily-transactions');
    return response.data;
  }
};

export default api;
