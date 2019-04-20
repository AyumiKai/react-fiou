import { IForm, IField } from './interfaces';
declare const useField: (name: string, form: IForm, { defaultValue, validations, fieldsToValidateOnChange }: {
    defaultValue: string;
    validations: Function[];
    fieldsToValidateOnChange: String[];
}) => IField;
export default useField;
