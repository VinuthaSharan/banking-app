import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { database } from '../models/database';
import { User, AuthPayload, RegisterPayload } from '../types/index';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export class AuthService {
  /**
   * Register a new user
   */
  async register(payload: RegisterPayload): Promise<{ user: User; token: string }> {
    // Check if user already exists
    const existingUser = await database.getUserByEmail(payload.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    // Create user
    const user = await database.createUser({
      email: payload.email,
      password: hashedPassword,
      fullName: payload.fullName,
      createdAt: new Date().toISOString()
    });

    // Create account
    await database.createAccount(user.id);

    // Generate token
    const token = this.generateToken(user.id);

    return { user, token };
  }

  /**
   * Login user
   */
  async login(payload: AuthPayload): Promise<{ user: User; token: string }> {
    const user = await database.getUserByEmail(payload.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = this.generateToken(user.id);

    return { user, token };
  }

  /**
   * Generate JWT token
   */
  generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
  }

  /**
   * Verify JWT token
   */
  verifyToken(token: string): { userId: string } {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

export const authService = new AuthService();
