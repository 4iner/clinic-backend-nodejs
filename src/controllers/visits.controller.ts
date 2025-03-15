import { Request, Response } from 'express';
import { Visit, CreateVisitRequest, UpdateVisitRequest } from '../types/visit';
import { dbService } from '../services/db.service';

export class VisitsController {
  public async create(
    req: Request<{ patientId: string }, {}, CreateVisitRequest>,
    res: Response
  ) {
    try {
      const patientId = parseInt(req.params.patientId);
      
      // Verify patient exists
      const patient = dbService.findPatientById(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }

      const visit = dbService.createVisit({
        ...req.body,
        patientId
      });
      
      res.status(201).json(visit);
    } catch (error) {
      console.error('Create visit error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async update(
    req: Request<{ patientId: string; id: string }, {}, UpdateVisitRequest>,
    res: Response
  ) {
    try {
      const visitId = parseInt(req.params.id);
      const patientId = parseInt(req.params.patientId);

      // Verify visit belongs to patient
      const existingVisit = dbService.findVisitById(visitId);
      if (!existingVisit) {
        return res.status(404).json({ message: 'Visit not found' });
      }
      if (existingVisit.patientId !== patientId) {
        return res.status(403).json({ message: 'Visit does not belong to this patient' });
      }

      const visit = dbService.updateVisit(visitId, req.body);
      res.json(visit);
    } catch (error) {
      console.error('Update visit error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(
    req: Request<{ patientId: string; id: string }>,
    res: Response
  ) {
    try {
      const visitId = parseInt(req.params.id);
      const patientId = parseInt(req.params.patientId);

      // Verify visit belongs to patient
      const existingVisit = dbService.findVisitById(visitId);
      if (!existingVisit) {
        return res.status(404).json({ message: 'Visit not found' });
      }
      if (existingVisit.patientId !== patientId) {
        return res.status(403).json({ message: 'Visit does not belong to this patient' });
      }

      const deleted = dbService.deleteVisit(visitId);
      res.status(204).send();
    } catch (error) {
      console.error('Delete visit error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getById(
    req: Request<{ patientId: string; id: string }>,
    res: Response
  ) {
    try {
      const visitId = parseInt(req.params.id);
      const patientId = parseInt(req.params.patientId);

      const visit = dbService.findVisitById(visitId);
      
      if (!visit) {
        return res.status(404).json({ message: 'Visit not found' });
      }
      if (visit.patientId !== patientId) {
        return res.status(403).json({ message: 'Visit does not belong to this patient' });
      }

      res.json(visit);
    } catch (error) {
      console.error('Get visit error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getByPatientId(
    req: Request<{ patientId: string }>,
    res: Response
  ) {
    try {
      const patientId = parseInt(req.params.patientId);
      
      // Verify patient exists
      const patient = dbService.findPatientById(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }

      const visits = dbService.findVisitsByPatientId(patientId);
      res.json(visits);
    } catch (error) {
      console.error('Get patient visits error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const visits = dbService.getAllVisits();
      res.json(visits);
    } catch (error) {
      console.error('Get all visits error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 