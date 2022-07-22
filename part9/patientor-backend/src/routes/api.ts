import express from "express";
import diagnoseService from "../services/diagnoseService";
import patientService from "../services/patientService";
import toNewPatient from "../utils/toNewPatient";

const apiRouter = express.Router();

apiRouter.get("/diagnoses", (_req, res) => {
  res.send(diagnoseService.getDiagnoseData());
});

apiRouter.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

apiRouter.get("/patients", (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

apiRouter.get("/patients/:id", (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

apiRouter.post("/patients", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default apiRouter;
