import express from 'express';
import { VisitsController } from '../controllers/visits.controller';

const router = express.Router({ mergeParams: true }); // Enable access to parent route parameters
const visitsController = new VisitsController();

// All routes will be prefixed with /api/patients/:patientId/visits
router.post('/', visitsController.create.bind(visitsController));
router.put('/:id', visitsController.update.bind(visitsController));
router.delete('/:id', visitsController.delete.bind(visitsController));
router.get('/:id', visitsController.getById.bind(visitsController));
router.get('/', visitsController.getByPatientId.bind(visitsController));

export default router; 