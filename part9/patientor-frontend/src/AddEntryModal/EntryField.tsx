import { Field, FieldProps } from "formik";
import { Select, MenuItem } from "@material-ui/core";
import { HealthCheckRating, Type } from "../types";
import { InputLabel } from "@material-ui/core";

// structure of a single option
export type typeOption = {
  value: Type;
  label: string;
};

export type healthRatingOption = {
  value: HealthCheckRating;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: typeOption[] | healthRatingOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => (
  <Select {...field} {...props} />
);

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);
