import { useState, useRef, useEffect } from 'react';
import { IForm, IFormData, IField } from './interfaces';

const useField = (
  name: string,
  form: IForm,
  {
    defaultValue = "",
    validations = [],
    fieldsToValidateOnChange = []
  }: {
    defaultValue: string;
    validations: Array<Function>;
    fieldsToValidateOnChange: Array<String>;
  }
) => {
  let [value, setValue] = useState<string>(defaultValue);
  let [errors, setErrors] = useState<Array<string>>([]);
  let [pristine, setPristine] = useState<boolean>(!defaultValue);
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

  let field: IField = {
    name,
    value,
    onChange: (e: React.BaseSyntheticEvent) => {
      if (pristine) {
        setPristine(false);
      }
      setValue(e.target.value);
    },
    onReset: () => {
      setPristine(true);
      setErrors([]);
      setValue(defaultValue);
    },
    setErrors,
    setValue,
    meta: {
      errors,
      pristine,
      validate,
      validating,
      defaultValue
    }
  };
  form.addField(field);
  useEffect(() => {
    if (pristine) return;
    form.validateFields(fieldsToValidateOnChange);
  }, [value]);

  return field;
};

export default useField;