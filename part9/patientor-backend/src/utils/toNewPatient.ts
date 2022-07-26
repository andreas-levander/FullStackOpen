import { NewPatient, Gender } from "../types/types";

type Fields = {
  dateOfBirth: unknown;
  name: unknown;
  ssn: unknown;
  occupation: unknown;
  gender: unknown;
  entries: unknown[];
};

const toNewPatient = ({
  dateOfBirth,
  name,
  ssn,
  occupation,
  gender,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    dateOfBirth: parseDate(dateOfBirth),
    name: parseString(name, "name"),
    ssn: parseString(ssn, "ssn"),
    occupation: parseString(occupation, "occupation"),
    gender: parseGender(gender),
    entries: [],
  };

  return newPatient;
};

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

export const parseString = (str: unknown, parameter: string): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing ${parameter}: ` + str);
  }
  return str;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

export default toNewPatient;
