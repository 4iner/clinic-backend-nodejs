import Loki from 'lokijs';
import { Role, User } from '../types/auth';
import { Patient, CreatePatientRequest, UpdatePatientRequest } from '../types/patient';
import { Visit, CreateVisitRequest, UpdateVisitRequest } from '../types/visit';
import bcrypt from 'bcrypt';

class DatabaseService {
  private db: Loki;
  private users: Collection<User>;
  private patients: Collection<Patient>;
  private visits: Collection<Visit>;

  constructor() {
    this.db = new Loki('clinic.db');
    this.users = this.db.addCollection('users');
    this.patients = this.db.addCollection('patients', { indices: ['id'] });
    this.visits = this.db.addCollection('visits', { indices: ['patientId'] });
    this.initializeData();
  }

  private initializeData() {
    // Add default user if collection is empty
    if (this.users.count() === 0) {
      const password = 'ClinicAppDemo';
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      this.users.insert({
        id: 1,
        username: 'Demo',
        password: hash,
        roles: [Role.ADMIN, Role.USER]
      });
    }
  }

  // User methods
  public findUserByUsername(username: string): User | null {
    return this.users.findOne({ username }) || null;
  }

  // Patient methods
  public createPatient(data: CreatePatientRequest): Patient | undefined {
    const now = new Date().toISOString();
    const patient: Patient = {
      id: this.patients.count() + 1,
      ...data,
      middleName: data.middleName || '',
      createdAt: now,
      updatedAt: now
    };
    return this.patients.insert(patient);
  }

  public updatePatient(id: number, data: UpdatePatientRequest): Patient | null {
    const patient = this.patients.findOne({ id });
    if (!patient) return null;

    const updatedPatient = {
      ...patient,
      ...data,
      updatedAt: new Date().toISOString()
    };

    this.patients.update(updatedPatient);
    return updatedPatient;
  }

  public deletePatient(id: number): boolean {
    return this.patients.findAndRemove({ id }) !== null;
  }

  public findPatientById(id: number): Patient | null {
    return this.patients.findOne({ id }) || null;
  }

  public getAllPatients(): Patient[] {
    return this.patients.find();
  }

  // Visit methods
  public createVisit(data: CreateVisitRequest): Visit | undefined {
    const now = new Date().toISOString();
    const visit: Visit = {
      id: this.visits.count() + 1,
      ...data,
      createdAt: now,
      updatedAt: now
    };
    return this.visits.insert(visit);
  }

  public updateVisit(id: number, data: UpdateVisitRequest): Visit | null {
    const visit = this.visits.findOne({ id });
    if (!visit) return null;

    const updatedVisit = {
      ...visit,
      ...data,
      updatedAt: new Date().toISOString()
    };

    this.visits.update(updatedVisit);
    return updatedVisit;
  }

  public deleteVisit(id: number): boolean {
    return this.visits.findAndRemove({ id }) !== null;
  }

  public findVisitById(id: number): Visit | null {
    const visit = this.visits.findOne({ id });
    if (!visit) return null;

    // Load the patient relationship
    const patient = this.findPatientById(visit.patientId);
    return patient ? { ...visit, patient } : visit;
  }

  public findVisitsByPatientId(patientId: number): Visit[] {
    return this.visits.find({ patientId });
  }

  public getAllVisits(): Visit[] {
    const visits = this.visits.find();
    return visits.map(visit => {
      const patient = this.findPatientById(visit.patientId);
      return patient ? { ...visit, patient } : visit;
    });
  }
}

export const dbService = new DatabaseService(); 