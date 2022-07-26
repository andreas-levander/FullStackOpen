import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Diagnosis, HealthCheckRating, Type } from "../types";
import { typeOption, SelectField, healthRatingOption } from "./EntryField";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: EntryFields) => void;
  onCancel: () => void;
}

export interface EntryFields {
  description: string;
  date: string;
  specialist: string;
  type: Type;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  healthCheckRating: HealthCheckRating;
  discharge: { date: string; criteria: string };
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

const typeOptions: typeOption[] = [
  { value: Type.HealthCheck, label: "HealthCheck" },
  { value: Type.Hospital, label: "Hospital" },
  { value: Type.OccupationalHealthcare, label: "OccupationalHealthcare" },
];

const healthRatingOptions: healthRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: Type.HealthCheck,
        healthCheckRating: HealthCheckRating.Healthy,
        discharge: {
          date: "",
          criteria: "",
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: {
          [field: string]: string;
        } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (
          values.type === Type.OccupationalHealthcare &&
          !values.employerName
        ) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        console.log(values);
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
              validate={() => {
                let error;
                if (!values.date || !isDate(values.date))
                  error =
                    "Discharge Date is required and need to be in correct format";
                return error;
              }}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField label="Type" name="type" options={typeOptions} />

            {values.type === Type.HealthCheck && (
              <div>
                <SelectField
                  label="Rating"
                  name="healthCheckRating"
                  options={healthRatingOptions}
                />
              </div>
            )}

            {values.type === Type.Hospital && (
              <div>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                  validate={() => {
                    let error;
                    if (
                      (values.type === Type.Hospital &&
                        !values.discharge?.date) ||
                      !isDate(values.discharge.date)
                    )
                      error =
                        "Discharge Date is required and needs to be in correct format";
                    return error;
                  }}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="criteria"
                  name="discharge.criteria"
                  component={TextField}
                  validate={() => {
                    let error;
                    if (
                      values.type === Type.Hospital &&
                      !values.discharge?.criteria
                    )
                      error = "Discharge Criteria is required";
                    return error;
                  }}
                />
              </div>
            )}

            {values.type === Type.OccupationalHealthcare && (
              <div>
                <Field
                  label="Employer Name"
                  placeholder="employer"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                  validate={() => {
                    let error;
                    if (
                      !values.sickLeave?.startDate ||
                      !isDate(values.sickLeave.startDate)
                    )
                      error =
                        "Sick Leave Start Date is required and need to be in correct format";
                    return error;
                  }}
                />
                <Field
                  label="Sick Leave End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                  validate={() => {
                    let error;
                    if (
                      !values.sickLeave?.endDate ||
                      !isDate(values.sickLeave.endDate)
                    )
                      error =
                        "Sick Leave End Date is required and need to be in correct format";
                    return error;
                  }}
                />
              </div>
            )}

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
