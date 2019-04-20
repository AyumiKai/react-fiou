export interface IFieldMeta {
  errors: string[];
  pristine: boolean;
  validate: Function;
  validating: boolean;
  defaultValue?: string;
}

export interface IField {
  name: string;
  value: string;
  onChange: (e: React.BaseSyntheticEvent) => void;
  meta: IFieldMeta;
  onReset: Function;
  setErrors: Function;
  setValue: Function,
}

export interface IFormData {
  [key: string]: any;
}

export interface IForm {
  onSubmit: (e: React.FormEvent) => void;
  isValid: () => boolean;
  addField: (field: IField) => void;
  getFormData: () => any;
  validateFields: Function;
  submitted: boolean;
  submitting: boolean;
  onReset: (e: React.MouseEvent) => void
}