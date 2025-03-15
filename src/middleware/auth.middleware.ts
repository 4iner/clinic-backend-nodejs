import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.config';

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    username: string;
  };
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const user = jwt.verify(token, config.jwtSecret) as {
      userId: number;
      username: string;
    };
    req.user = user;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}; 