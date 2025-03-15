import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();
const authController = new AuthController();

// Public route
router.post('/signin', authController.signin.bind(authController));

export default router; 