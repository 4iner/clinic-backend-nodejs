import { Request, Response } from 'express';
import { Patient, CreatePatientRequest, UpdatePatientRequest } from '../types/patient';
import { dbService } from '../services/db.service';

export class PatientsController {
  public async create(req: Request<{}, {}, CreatePatientRequest>, res: Response) {
    try {
      const patient = dbService.createPatient(req.body);
      res.status(201).json(patient);
    } catch (error) {
      console.error('Create patient error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async update(
    req: Request<{ id: string }, {}, UpdatePatientRequest>,
    res: Response
  ) {
    try {
      const id = parseInt(req.params.id);
      const patient = dbService.updatePatient(id, req.body);
      
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }

      res.json(patient);
    } catch (error) {
      console.error('Update patient error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = dbService.deletePatient(id);

      if (!deleted) {
        return res.status(404).json({ message: 'Patient not found' });
      }

      res.status(204).send();
    } catch (error) {
      console.error('Delete patient error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getById(req: Request<{ id: string }>, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const patient = dbService.findPatientById(id);

      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }

      res.json(patient);
    } catch (error) {
      console.error('Get patient error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const patients = dbService.getAllPatients();
      res.json(patients);
    } catch (error) {
      console.error('Get all patients error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 