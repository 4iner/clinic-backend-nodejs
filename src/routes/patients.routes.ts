import express from 'express';
import { PatientsController } from '../controllers/patients.controller';
import visitRoutes from './visits.routes';

const router = express.Router();
const patientsController = new PatientsController();

// Patient routes
router.post('/', patientsController.create.bind(patientsController));
router.put('/:id', patientsController.update.bind(patientsController));
router.delete('/:id', patientsController.delete.bind(patientsController));
router.get('/:id', patientsController.getById.bind(patientsController));
router.get('/', patientsController.getAll.bind(patientsController));

// Nested visits routes
router.use('/:patientId/visits', visitRoutes);

export default router; 