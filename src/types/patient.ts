export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber: string;
  country: string;
  email?: string;
  dateOfBirth: string; // ISO date string
  gender: Gender;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber: string;
  country: string;
  email?: string;
  dateOfBirth: string;
  gender: Gender;
}

export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {} 