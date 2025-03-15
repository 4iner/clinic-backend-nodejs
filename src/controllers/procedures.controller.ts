import { Request, Response } from 'express';
import { PlasticSurgeryProcedure } from '../types/procedures';

export class ProceduresController {
  public async getAll(req: Request, res: Response) {
    try {
      // Get all procedure values (the string representations)
      const procedures = Object.values(PlasticSurgeryProcedure);
      res.json(procedures);
    } catch (error) {
      console.error('Get procedures error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 