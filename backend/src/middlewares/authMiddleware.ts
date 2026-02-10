import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Authorization token is required' });
      return;
    }

    const decoded = authService.verifyToken(token);
    (req as any).userId = decoded.userId;
    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}
