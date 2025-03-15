import express from 'express';
import { ProceduresController } from '../controllers/procedures.controller';

const router = express.Router();
const proceduresController = new ProceduresController();

router.get('/', proceduresController.getAll.bind(proceduresController));

export default router; 