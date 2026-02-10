import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { AuthPayload, RegisterPayload } from '../types/index';

export class AuthController {
  /**
   * Register new user
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const payload: RegisterPayload = req.body;

      if (!payload.email || !payload.password || !payload.fullName) {
        res.status(400).json({ error: 'Email, password, and fullName are required' });
        return;
      }

      const result = await authService.register(payload);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Login user
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const payload: AuthPayload = req.body;

      if (!payload.email || !payload.password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      const result = await authService.login(payload);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();
