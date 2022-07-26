import { diagnosesCodes } from "../data/diagnoses";
import {
  BaseEntry,
  EntryInput,
  HealthCheckRating,
  HospitalEntry,
  Type,
  OccupationalHealthcareEntry,
} from "../types/types";
import { isDate, isString, parseDate, parseString } from "./toNewPatient";

type Fields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  type: unknown;
  diagnosisCodes?: unknown[];
  healthCheckRating?: unknown;
  discharge?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
};

const toNewEntry = ({
  description,
  date,
  specialist,
  type,
  diagnosisCodes,
  healthCheckRating,
  discharge,
  employerName,
  sickLeave,
}: Fields): EntryInput => {
  const newEntry: Omit<BaseEntry, "id"> = {
    description: parseString(description, "description"),
    date: parseDate(date),
    specialist: parseString(specialist, "specialist"),
    diagnosisCodes: parseCodes(diagnosisCodes),
  };

  const entryType = parseType(type);

  switch (entryType) {
    case Type.HealthCheck:
      return {
        ...newEntry,
        type: entryType,
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
    case Type.Hospital:
      return {
        ...newEntry,
        type: entryType,
        discharge: parseDischarge(discharge),
      };
    case Type.OccupationalHealthcare:
      return {
        ...newEntry,
        type: entryType,
        employerName: parseString(employerName, "employerName"),
        sickLeave: parseSickLeave(sickLeave),
      };
    default:
      return assertNever(entryType);
  }
};

const parseCodes = (codes: unknown[] | undefined): string[] | undefined => {
  if (!codes) return undefined;

  if (
    Array.isArray(codes) &&
    codes.every((s) => isString(s) && diagnosesCodes.includes(s))
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return codes;
  }
  throw new Error("diagnosisCodes not array of strings or code is invalid");
};

const parseType = (type: unknown): Type => {
  if (type && Object.values(Type).includes(type as Type)) {
    return type as Type;
  }

  throw new Error("wrong or missing type");
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (
    rating &&
    Object.values(HealthCheckRating).includes(rating as HealthCheckRating)
  ) {
    return rating as HealthCheckRating;
  }

  throw new Error("wrong or missing healthcheckrating");
};

const parseDischargeObj = (
  obj: unknown
): { date: unknown; criteria: unknown } => {
  if (obj && typeof obj === "object" && "date" in obj && "criteria" in obj) {
    return obj as { date: unknown; criteria: unknown };
  }
  throw new Error("missing or wrong discharge type");
};

const parseDischarge = (obj: unknown): HospitalEntry["discharge"] => {
  const dis = parseDischargeObj(obj);

  if (!isString(dis.criteria) || !isString(dis.date) || !isDate(dis.date))
    throw new Error("wrong or missing criteria or date on discharge object");

  return dis as HospitalEntry["discharge"];
};

const parseSickLeaveObj = (
  obj: unknown
): { startDate: unknown; endDate: unknown } => {
  if (
    obj &&
    typeof obj === "object" &&
    "startDate" in obj &&
    "endDate" in obj
  ) {
    return obj as { startDate: unknown; endDate: unknown };
  }
  throw new Error("missing or wrong sickleave type");
};

const parseSickLeave = (
  obj: unknown
): OccupationalHealthcareEntry["sickLeave"] => {
  const dis = parseSickLeaveObj(obj);

  if (
    !isString(dis.startDate) ||
    !isDate(dis.startDate) ||
    !isString(dis.endDate) ||
    !isDate(dis.endDate)
  )
    throw new Error(
      "wrong or missing startDate or endDate on discharge object"
    );

  return dis as OccupationalHealthcareEntry["sickLeave"];
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default toNewEntry;
