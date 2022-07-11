import patients from "../data/patients";
import { NewPatient, NonSensitivePatientData, Patient } from "../types/types";
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

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuidv4() };

  patients.push(newPatient);

  return newPatient;
};
export default { getNonSensitivePatientData, addPatient };
