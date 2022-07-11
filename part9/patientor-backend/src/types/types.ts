export interface DiagnoseData {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male,
  Female,
  Other,
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientData = Omit<Patient, "ssn">;
