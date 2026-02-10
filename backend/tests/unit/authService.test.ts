import { AuthService } from '../../src/services/authService';

// Mock the database
jest.mock('../../src/models/database');

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const userId = 'test-user-id';
      const token = authService.generateToken(userId);

      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
    });

    it('should generate different tokens for different users', () => {
      const token1 = authService.generateToken('user-1');
      const token2 = authService.generateToken('user-2');

      expect(token1).not.toBe(token2);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const userId = 'test-user-id';
      const token = authService.generateToken(userId);
      const decoded = authService.verifyToken(token);

      expect(decoded.userId).toBe(userId);
    });

    it('should throw error for invalid token', () => {
      const invalidToken = 'invalid.token.here';

      expect(() => {
        authService.verifyToken(invalidToken);
      }).toThrow('Invalid or expired token');
    });

    it('should throw error for empty token', () => {
      expect(() => {
        authService.verifyToken('');
      }).toThrow();
    });
  });
});
