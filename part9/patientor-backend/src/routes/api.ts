import express from "express";
import diagnoseService from "../services/diagnoseService";
import patientService from "../services/patientService";

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

export default apiRouter;
