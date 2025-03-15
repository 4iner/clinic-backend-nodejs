import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SignInRequest, SignInResponse, ErrorResponse } from '../types/auth';
import { config } from '../config/env.config';
import { dbService } from '../services/db.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class AuthController {
  public async signin(
    req: AuthRequest,
    res: Response<SignInResponse | ErrorResponse>
  ) {
    try {
      const { username, password } = req.body as SignInRequest;

      // Find user
      const user = dbService.findUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const jwtToken = jwt.sign(
        { userId: user.id, username: user.username },
        config.jwtSecret,
        { expiresIn: '10h' }
      );

      res.json({ id: user.id, username, jwtToken, roles: user.roles });
    } catch (error) {
      console.error('Signin error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 