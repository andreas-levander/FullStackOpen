import { useParams } from "react-router-dom";
import { setPatient, useStateValue } from "../state";
import { useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { QuestionMark, Male, Female } from "@mui/icons-material";

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

  return (
    <div>
      <h1>
        <b>
          {patient.name} {patientIcon()}
        </b>
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;
