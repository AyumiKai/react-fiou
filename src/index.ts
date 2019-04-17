import { Component, useState, useEffect, useRef } from "react";

interface IField {
  name: string;
  value: string;
  errors: string[];
  setErrors: Function;
  pristine: boolean;
  onChange: Function;
  validate: Function;
  validating: boolean;
}

interface IFormData {
  [key: string]: any
}

interface IForm {
  onSubmit: (e: React.FormEvent) => void;
  isValid: () => boolean;
  addField: (field: IField) => void;
  getFormData: () => any;
  validateFields: Function;
  submitted: boolean;
  submitting: boolean;
}

export const useField = (
  name: string,
  form: IForm,
  { defaultValue = '', validations = [], fieldsToValidateOnChange = [] }: {
    defaultValue: string,
    validations: Array<Function>,
    fieldsToValidateOnChange: Array<String>
  }
) => {
  let [value, setValue] = useState<string>(defaultValue);
  let [errors, setErrors] = useState<Array<string>>([]);
  let [pristine, setPristine] = useState<boolean>(true);
  let [validating, setValidating] = useState<boolean>(false);
  let validateCounter = useRef<number>(0);

  const validate = async () => {
    let validateIteration: number = ++validateCounter.current;
    setValidating(true);
    let formData: Array<IFormData> = form.getFormData();
    let errorMessages = await Promise.all(
      validations.map(validation => validation(formData, name))
    );
    errorMessages = errorMessages.filter(errorMsg => !!errorMsg);
    if (validateIteration === validateCounter.current) {
      setErrors(errorMessages);
      setValidating(false);
    }
    let fieldValid = errorMessages.length === 0;
    return fieldValid;
  };

  useEffect(
    () => {
      if (pristine) return;
      form.validateFields(fieldsToValidateOnChange);
    },
    [value]
  );

  let field: IField = {
    name,
    value,
    errors,
    setErrors,
    pristine,
    onChange: e => {
      if (pristine) {
        setPristine(false);
      }
      setValue(e.target.value);
    },
    validate,
    validating
  };
  form.addField(field);
  return field;
};

export const useForm = ({ onSubmit }) => {
  let [submitted, setSubmitted] = useState<boolean>(false);
  let [submitting, setSubmitting] = useState<boolean>(false);
  let fields: Array<IField> = [];

  const validateFields = async fieldNames => {
    let fieldsToValidate;
    if (Array.isArray(fieldNames)) {
      fieldsToValidate = fields.filter(field =>
        fieldNames.includes(field.name)
      );
    } else {
      fieldsToValidate = fields;
    }
    let fieldsValid = await Promise.all(
      fieldsToValidate.map(field => field.validate())
    );
    let formValid = fieldsValid.every(isValid => isValid === true);
    return formValid;
  };

  const getFormData = () => {
    return fields.reduce((formData, f) => {
      formData[f.name] = f.value;
      return formData;
    }, {});
  };

  const resultForm: IForm = {
    onSubmit: async e => {
      e.preventDefault();
      setSubmitting(true);
      setSubmitted(true);
      let formValid = await validateFields([]);
      let returnVal = await onSubmit(getFormData(), formValid);
      setSubmitting(false);
      return returnVal;
    },
    isValid: () => fields.every(f => f.errors.length === 0),
    addField: field => { fields.push(field) },
    getFormData,
    validateFields,
    submitted,
    submitting
  };

  return resultForm;
};
