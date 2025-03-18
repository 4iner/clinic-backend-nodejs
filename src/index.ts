import express from 'express';
import cors from 'cors';
import { config } from './config/env.config';
import authRoutes from './routes/auth.routes';
import patientRoutes from './routes/patients.routes';
import proceduresRoutes from './routes/procedures.routes';
import { authenticateJWT } from './middleware/auth.middleware';

const app = express();

// Middleware
app.use(cors({
  origin: config.allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Public routes (no authentication required)
app.use('/api/auth', authRoutes);

// Protected routes (require authentication)
app.use('/api/patients', authenticateJWT, patientRoutes);
app.use('/api/procedures', authenticateJWT, proceduresRoutes);

// Start server
app.listen(config.port, () => {
  const mode = config.isDevelopment ? 'development' : 'production';
  console.log(`Server running in ${mode} mode at http://localhost:${config.port}`);
}); 