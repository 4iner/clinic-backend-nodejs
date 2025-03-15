import { Patient } from './patient';
import { PlasticSurgeryProcedure } from './procedures';

export interface Visit {
  id: number;
  patientId: number;  // Foreign key to Patient
  patient?: Patient;  // Optional loaded relationship
  medicalNote: string;
  date: string;  // ISO date string
  plasticSurgeryProcedure: PlasticSurgeryProcedure;
  photos: string[];  // Array of photo URLs/paths
  createdAt: string;
  updatedAt: string;
}

export interface CreateVisitRequest {
  patientId: number;
  medicalNote: string;
  date: string;  // ISO date string
  plasticSurgeryProcedure: PlasticSurgeryProcedure;
  photos: string[];
}

export interface UpdateVisitRequest extends Partial<CreateVisitRequest> {}
