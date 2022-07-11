import diagnoses from "../data/diagnoses";
import { DiagnoseData } from "../types/types";

const getDiagnoseData = (): DiagnoseData[] => {
  return diagnoses;
};

export default {
  getDiagnoseData,
};
