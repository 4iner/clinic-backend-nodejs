import { Gender } from './gender';
import { Visit } from './visit';

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  country: string;
  email: string;
  dateOfBirth: string;
  gender: Gender;
  createdAt: string;
  updatedAt: string;
  visits: Visit[];  // Required array of visits, will be empty if no visits exist
}

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber: string;
  country: string;
  email: string;
  dateOfBirth: string;
  gender: Gender;
}

export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {} 