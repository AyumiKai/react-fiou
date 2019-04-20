import { useState } from 'react';
import { IField, IForm } from './interfaces';

const useForm = ({ onSubmit }) => {
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
      fieldsToValidate.map(field => field.meta.validate())
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
    isValid: () => fields.every(f => f.meta.errors.length === 0),
    addField: field => {
      fields.push(field);
    },
    getFormData,
    validateFields,
    submitted,
    submitting,
    onReset: (e) => {
      e.preventDefault();
      fields.forEach(field => {
        if (!field.meta.pristine) {
          field.onReset();
        }
      })
    }
  };

  return resultForm;
};

export default useForm;
