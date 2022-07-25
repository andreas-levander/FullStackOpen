import { useParams } from "react-router-dom";
import { setPatient, useStateValue } from "../state";
import { useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Patient,
} from "../types";
import {
  QuestionMark,
  Male,
  Female,
  LocalHospital,
  LocalPharmacy,
  Work,
} from "@mui/icons-material";
import { Favorite } from "@material-ui/icons";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log("fetching patient", id);
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (id && (!patient || patient.id !== id)) void fetchPatient(id);
  }, [dispatch]);

  if (!patient) return <h1>loading..</h1>;

  const patientIcon = () => {
    switch (patient.gender) {
      case "male":
        return <Male />;
      case "female":
        return <Female />;
      default:
        return <QuestionMark />;
    }
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryComponent entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntryComponent entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalEntryComponent entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <h1>
        <b>
          {patient.name} {patientIcon()}
        </b>
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>
        <b>entries</b>
      </h3>
      {patient.entries?.map((entry) => (
        <div key={entry.id} style={{ padding: "2px" }}>
          {EntryDetails(entry)}
        </div>
      ))}
    </div>
  );
};

const entryStyle = {
  border: "2px solid",
  padding: "5px",
  borderRadius: "10px",
};

const HospitalEntryComponent = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div style={entryStyle}>
      <p>
        {entry.date} <LocalHospital />
      </p>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.filter((d) => d.code === code)[0]?.name}
          </li>
        ))}
      </ul>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

const OccupationalEntryComponent = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div style={entryStyle}>
      <p>
        {entry.date} <Work />
      </p>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.filter((d) => d.code === code)[0]?.name}
          </li>
        ))}
      </ul>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

const HealthCheckEntryComponent = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div style={entryStyle}>
      <p>
        {entry.date} <LocalPharmacy />
      </p>
      <p>{entry.description}</p>
      {entry.healthCheckRating === 0 && <Favorite style={{ color: "green" }} />}
      {entry.healthCheckRating === 1 && (
        <Favorite style={{ color: "yellowgreen" }} />
      )}
      {entry.healthCheckRating === 2 && (
        <Favorite style={{ color: "yellow" }} />
      )}
      {entry.healthCheckRating === 3 && <Favorite style={{ color: "red" }} />}
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.filter((d) => d.code === code)[0]?.name}
          </li>
        ))}
      </ul>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default PatientPage;
