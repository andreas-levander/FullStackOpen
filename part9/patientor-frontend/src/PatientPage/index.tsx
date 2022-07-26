import { useParams } from "react-router-dom";
import { setPatient, useStateValue } from "../state";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import {
  BaseEntry,
  Entry,
  EntryInput,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Patient,
  Type,
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
import { Button } from "@material-ui/core";
import AddEntryModal from "../AddEntryModal";
import { EntryFields } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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
      case Type.Hospital:
        return <HospitalEntryComponent entry={entry} />;
      case Type.HealthCheck:
        return <HealthCheckEntryComponent entry={entry} />;
      case Type.OccupationalHealthcare:
        return <OccupationalEntryComponent entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  const formatNewEntry = (values: EntryFields): EntryInput => {
    const baseEntry: Omit<BaseEntry, "id"> = {
      description: values.description,
      date: values.date,
      specialist: values.specialist,
    };
    if (values.diagnosisCodes) baseEntry.diagnosisCodes = values.diagnosisCodes;

    switch (values.type) {
      case Type.HealthCheck:
        return {
          ...baseEntry,
          type: values.type,
          healthCheckRating: values.healthCheckRating,
        };
      case Type.Hospital:
        return {
          ...baseEntry,
          type: values.type,
          discharge: {
            date: values.discharge.date,
            criteria: values.discharge.criteria,
          },
        };
      case Type.OccupationalHealthcare:
        return {
          ...baseEntry,
          type: values.type,
          employerName: values.employerName,
          sickLeave: values.sickLeave,
        };
      default:
        return assertNever(values.type);
    }
  };

  const submitNewEntry = async (values: EntryFields) => {
    try {
      if (!id) return;
      const entry = formatNewEntry(values);
      console.log(entry);
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );
      console.log(newEntry);
      dispatch(
        setPatient({ ...patient, entries: patient.entries.concat(newEntry) })
      );
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
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
