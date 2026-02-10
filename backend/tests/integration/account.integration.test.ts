import request from 'supertest';
import app from '../../src/app';
import { AccountService } from '../../src/services/accountService';

describe('Account API Integration Tests', () => {
  let token: string;
  let userId: string;

  beforeEach(async () => {
    // Register and login a user
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'account@example.com',
        password: 'Test@1234',
        fullName: 'Account Test'
      });

    token = registerResponse.body.token;
    userId = registerResponse.body.user.id;
  });

  describe('GET /api/account/details', () => {
    it('should get account details with valid token', async () => {
      const response = await request(app)
        .get('/api/account/details')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('balance');
      expect(response.body.userId).toBe(userId);
    });

    it('should reject request without token', async () => {
      const response = await request(app)
        .get('/api/account/details');

      expect(response.status).toBe(401);
    });

    it('should reject request with invalid token', async () => {
      const response = await request(app)
        .get('/api/account/details')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/account/deposit', () => {
    it('should deposit money successfully', async () => {
      const response = await request(app)
        .post('/api/account/deposit')
        .set('Authorization', `Bearer ${token}`)
        .send({
          amount: 100,
          description: 'Test deposit'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.type).toBe('deposit');
      expect(response.body.amount).toBe(100);
    });

    it('should reject deposit with invalid amount', async () => {
      const response = await request(app)
        .post('/api/account/deposit')
        .set('Authorization', `Bearer ${token}`)
        .send({
          amount: -100,
          description: 'Test deposit'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should block account after deposit', async () => {
      // First deposit
      await request(app)
        .post('/api/account/deposit')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 100 });

      // Try second deposit - should be blocked
      const response = await request(app)
        .post('/api/account/deposit')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 50 });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('blocked');
    });
  });

  describe('POST /api/account/withdraw', () => {
    beforeEach(async () => {
      // Deposit some money first
      await request(app)
        .post('/api/account/deposit')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 500 });
    });

    it('should reject withdrawal when blocked', async () => {
      const response = await request(app)
        .post('/api/account/withdraw')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 100 });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('blocked');
    });

    it('should reject withdrawal with insufficient balance', async () => {
      // Create a new user with no block and low balance
      const newUserResponse = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'lowbalance@example.com',
          password: 'Test@1234',
          fullName: 'Low Balance'
        });

      const newToken = newUserResponse.body.token;

      // Deposit 50
      await request(app)
        .post('/api/account/deposit')
        .set('Authorization', `Bearer ${newToken}`)
        .send({ amount: 50 });

      // Wait for block to expire (or use a mock in real scenario)
      // For now, try to withdraw more than balance in next session
      const response = await request(app)
        .post('/api/account/withdraw')
        .set('Authorization', `Bearer ${newToken}`)
        .send({ amount: 100 });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Insufficient balance');
    });
  });

  describe('GET /api/account/transactions', () => {
    it('should get transaction history', async () => {
      // Make a deposit
      await request(app)
        .post('/api/account/deposit')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 100 });

      const response = await request(app)
        .get('/api/account/transactions')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/account/block-status', () => {
    it('should check block status', async () => {
      const response = await request(app)
        .get('/api/account/block-status')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('isBlocked');
    });

    it('should show blocked status after transaction', async () => {
      // Make a deposit
      await request(app)
        .post('/api/account/deposit')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 100 });

      // Check block status
      const response = await request(app)
        .get('/api/account/block-status')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.isBlocked).toBe(true);
    });
  });
});
