import { useField, useForm } from '../../../src/index';
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import './index.css';

const Field = ({
  label,
  name,
  value,
  type = "text",
  onChange,
  meta: {
    pristine,
    errors,
    validating,
  },
  formSubmitted,
  ...other
}: {
  label: string,
  name?: string,
  value?: any,
  type?: string,
  onChange?: (e: React.BaseSyntheticEvent) => void,
  meta?: any,
  formSubmitted?: boolean
}): JSX.Element => {
  const showErrors = (!pristine || formSubmitted) && !!errors.length;
  return (
     <FormControl className="field" error={showErrors}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        id={name}
        value={value}
        onChange={onChange}
        {...other}
      />
      <FormHelperText component="div">
        {showErrors &&
          errors.map((errorMsg: any) => <div key={errorMsg}>{errorMsg}</div>)}
      </FormHelperText>
    </FormControl>
  );
};

const Basic = (props: any) => {
  const form = useForm({
    onSubmit: (formData: any, isValid: boolean) => {
      if (!isValid) return;
      alert(JSON.stringify(formData));
    }
  });

  const usernameField = useField("username", form, {
    defaultValue: "",
    validations: [
      (formData: any) =>
        formData.username.length < 6 && "Username must be at least 6 characters"
    ],
    fieldsToValidateOnChange: ["username"]
  });

  const passWordField = useField("password", form, {
    defaultValue: "",
    validations: [
      (formData: any) => formData.password.length < 6 && "Password must be at least 6 characters"
    ],
    fieldsToValidateOnChange: ["password", "confirmPassword"]
  });

  const confirmPassWordField = useField("confirmPassword", form, {
    defaultValue: "",
    validations: [
      (formData: any) =>
        (formData.password !== formData.confirmPassword) &&
        "Passwords do not match"
    ],
    fieldsToValidateOnChange: ["password", "confirmPassword"]
  });

  const requiredFields = [usernameField, passWordField, confirmPassWordField];
  return (
    <div className="container">
      <Field
        {...usernameField}
        formSubmitted={form.submitted}
        label="username"
      />
      <Field
        {...passWordField}
        formSubmitted={form.submitted}
        label="password"
        type="password"
      />
      <Field
        {...confirmPassWordField}
        formSubmitted={form.submitted}
        label="confirmPassword"
        type="password"
      />
      <Grid spacing={24} container>
        <Grid item xs={6}>
           <Button
            variant="contained" 
            color="primary"
            disabled={
              !form.isValid() ||
              form.submitting ||
              requiredFields.some(f => f.meta.pristine)
            }
            onClick={form.onSubmit}
          >Submit</Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={form.onReset} variant="contained">reset</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Basic;