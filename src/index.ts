import express from 'express';
import { config } from './config/env.config';
import authRoutes from './routes/auth.routes';
import patientRoutes from './routes/patients.routes';
import proceduresRoutes from './routes/procedures.routes';
import { authenticateJWT } from './middleware/auth.middleware';

const app = express();

// Middleware
app.use(express.json());

// Public routes (no authentication required)
app.use('/api/auth', authRoutes);

// Protected routes (require authentication)
app.use('/api/patients', authenticateJWT, patientRoutes);
app.use('/api/procedures', authenticateJWT, proceduresRoutes);

// Start server
app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
}); 