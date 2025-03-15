import Loki from 'lokijs';
import { Role, User } from '../types/auth';
import { Patient, CreatePatientRequest, UpdatePatientRequest } from '../types/patient';
import { Visit, CreateVisitRequest, UpdateVisitRequest } from '../types/visit';
import { Gender } from '../types/gender';
import { PlasticSurgeryProcedure } from '../types/procedures';
import bcrypt from 'bcrypt';

class DatabaseService {
  private db: Loki;
  private users: Collection<User>;
  private patients: Collection<Patient>;
  private visits: Collection<Visit>;

  constructor() {
    this.db = new Loki('clinic.db');
    this.users = this.db.addCollection('users');
    this.patients = this.db.addCollection('patients', { indices: ['email'] });
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

    // Add sample patients if collection is empty
    if (this.patients.count() === 0) {
      const now = new Date().toISOString();
      
      // Insert patients
      this.patients.insert({
        id: 1,
        country: 'Canada',
        dateOfBirth: '1997-02-27',
        email: 'foreigncode@gmail.com',
        firstName: 'Mustafa',
        gender: Gender.MALE,
        lastName: 'Abdulmajeed',
        middleName: '',
        phoneNumber: '613-415-1052',
        createdAt: now,
        updatedAt: now,
        visits: []
      });

      this.patients.insert({
        id: 2,
        country: 'United States',
        dateOfBirth: '1992-05-13',
        email: 'someuser@gmail.com',
        firstName: 'John',
        gender: Gender.MALE,
        lastName: 'Smith',
        middleName: '',
        phoneNumber: '555-232-3133',
        createdAt: now,
        updatedAt: now,
        visits: []
      });

      this.patients.insert({
        id: 3,
        country: 'Algeria',
        dateOfBirth: '1995-10-30',
        email: 'spoopy@hotmail.com',
        firstName: 'Jane',
        gender: Gender.FEMALE,
        lastName: 'Doe',
        middleName: '',
        phoneNumber: '555-103-9382',
        createdAt: now,
        updatedAt: now,
        visits: []
      });
    }

    // Add sample visits if collection is empty
    if (this.visits.count() === 0) {
      const now = new Date().toISOString();

      // Insert visits for Mustafa (Patient 1)
      this.visits.insert({
        id: 1,
        patientId: 1,
        date: '2020-08-10',
        medicalNote: 'Patient complained about nose sizes. The patient would like a smaller nose.',
        plasticSurgeryProcedure: PlasticSurgeryProcedure.NOSE_RESHAPING,
        photos: [
          '/patient_images/patients/1/visit/1/image1.png',
          '/patient_images/patients/1/visit/1/image2.png',
          '/patient_images/patients/1/visit/1/image3.png'
        ],
        createdAt: now,
        updatedAt: now
      });

      this.visits.insert({
        id: 2,
        patientId: 1,
        date: '2020-08-11',
        medicalNote: 'Patient is coming back for a follow up to check out the surgery results.',
        plasticSurgeryProcedure: PlasticSurgeryProcedure.FOLLOW_UP,
        photos: [
          '/patient_images/patients/1/visit/2/image1.png',
          '/patient_images/patients/1/visit/2/image2.png'
        ],
        createdAt: now,
        updatedAt: now
      });

      this.visits.insert({
        id: 3,
        patientId: 1,
        date: '2020-08-15',
        medicalNote: 'Patient is coming back for a follow up to make sure the nose healed',
        plasticSurgeryProcedure: PlasticSurgeryProcedure.FOLLOW_UP,
        photos: [
          '/patient_images/patients/1/visit/3/image1.png'
        ],
        createdAt: now,
        updatedAt: now
      });

      // Insert visits for Jane (Patient 3)
      this.visits.insert({
        id: 4,
        patientId: 3,
        date: '2020-05-05',
        medicalNote: 'Patient came in with concerns about oversized breasts, and would like a reduction surgery.',
        plasticSurgeryProcedure: PlasticSurgeryProcedure.BREAST_REDUCTION,
        photos: [
          '/patient_images/patients/3/visit/4/image1.png',
          '/patient_images/patients/3/visit/4/image2.png'
        ],
        createdAt: now,
        updatedAt: now
      });

      this.visits.insert({
        id: 5,
        patientId: 3,
        date: '2020-05-21',
        medicalNote: 'Post-surgery recovery follow-up',
        plasticSurgeryProcedure: PlasticSurgeryProcedure.FOLLOW_UP,
        photos: [
          '/patient_images/patients/3/visit/5/image1.png',
          '/patient_images/patients/3/visit/5/image2.png'
        ],
        createdAt: now,
        updatedAt: now
      });
    }
  }

  private standardizePatient(patient: Patient): Patient {
    return {
      id: patient.id,
      firstName: patient.firstName || '',
      lastName: patient.lastName || '',
      middleName: patient.middleName || '',
      phoneNumber: patient.phoneNumber || '',
      country: patient.country || '',
      email: patient.email || '',
      dateOfBirth: patient.dateOfBirth || '',
      gender: patient.gender,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
      visits: Array.isArray(patient.visits) ? patient.visits.map(this.standardizeVisit) : []
    };
  }

  private standardizeVisit(visit: Visit): Visit {
    return {
      id: visit.id,
      patientId: visit.patientId,
      date: visit.date || '',
      medicalNote: visit.medicalNote || '',
      plasticSurgeryProcedure: visit.plasticSurgeryProcedure,
      photos: Array.isArray(visit.photos) ? visit.photos : [],
      createdAt: visit.createdAt,
      updatedAt: visit.updatedAt
    };
  }

  // User methods
  public findUserByUsername(username: string): User | null {
    return this.users.findOne({ username }) || null;
  }

  // Patient methods with visits included
  public createPatient(data: CreatePatientRequest): Patient | null {
    const now = new Date().toISOString();
    const patient: Patient = {
      id: this.patients.count() + 1,
      ...data,
      middleName: data.middleName || '',
      createdAt: now,
      updatedAt: now,
      visits: []
    };
    const savedPatient = this.patients.insert(patient);
    return savedPatient ? this.addVisitsToPatient(savedPatient) : null;
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
    return this.addVisitsToPatient(updatedPatient);
  }

  public deletePatient(id: number): boolean {
    return this.patients.findAndRemove({ id }) !== null;
  }

  public findPatientById(id: number): Patient | null {
    const patient = this.patients.findOne({ id });
    return patient ? this.addVisitsToPatient(patient) : null;
  }

  public getAllPatients(): Patient[] {
    const patients = this.patients.find();
    return patients.map(patient => this.addVisitsToPatient(patient));
  }

  private addVisitsToPatient(patient: Patient): Patient {
    const visits = this.visits.find({ patientId: patient.id }) || [];
    return this.standardizePatient({
      ...patient,
      visits: visits.map(this.standardizeVisit)
    });
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
    const savedVisit = this.visits.insert(visit);
    return savedVisit ? this.standardizeVisit(savedVisit) : undefined;
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
    return this.standardizeVisit(updatedVisit);
  }

  public deleteVisit(id: number): boolean {
    return this.visits.findAndRemove({ id }) !== null;
  }

  public findVisitById(id: number): Visit | null {
    const visit = this.visits.findOne({ id });
    if (!visit) return null;

    const standardizedVisit = this.standardizeVisit(visit);
    const patient = this.findPatientById(visit.patientId);
    return patient ? { ...standardizedVisit, patient } : standardizedVisit;
  }

  public findVisitsByPatientId(patientId: number): Visit[] {
    return this.visits.find({ patientId });
  }

  public getAllVisits(): Visit[] {
    const visits = this.visits.find();
    return visits.map(visit => {
      const standardizedVisit = this.standardizeVisit(visit);
      const patient = this.findPatientById(visit.patientId);
      return patient ? { ...standardizedVisit, patient } : standardizedVisit;
    });
  }
}

export const dbService = new DatabaseService(); 