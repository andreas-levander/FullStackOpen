import patients from "../data/patients";
import {
  EntryInput,
  Entry,
  NewPatient,
  NonSensitivePatientData,
  Patient,
} from "../types/types";
import { v4 as uuidv4 } from "uuid";

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient => {
  return patients.filter((patient) => patient.id === id)[0];
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuidv4() };

  patients.push(newPatient);

  return newPatient;
};

const addEntry = (patientId: string, entry: EntryInput): Entry => {
  const newEntry: Entry = { ...entry, id: uuidv4() };

  const patient = patients.find((p) => p.id === patientId);
  if (!patient) throw new Error("no patient found with that id");

  patient.entries.push(newEntry);

  return newEntry;
};
export default { getNonSensitivePatientData, addPatient, getPatient, addEntry };
