import { IFieldProps, TFieldType } from "./field.types";
import { IYarnImage } from "./yarn.types";

export type FormFieldValue =
  | string
  | number
  | File
  | null
  | Record<string, number>
  | IYarnImage;

export interface IFormFieldConfig
  extends Omit<IFieldProps, "error" | "onBlur"> {
  name: string;
  label: string;
  type?: TFieldType;
  required?: boolean;
  gridColumn?: "full" | "half"; // for responsive layout
  validate?: (value: FormFieldValue) => string | undefined;
}

export interface IFormProps {
  formTitle?: string;
  formData: Record<string, FormFieldValue>;
  onFormDataChange: (data: Record<string, FormFieldValue>) => void;
  title?: string;
  subtitle?: string;
  fields: { fields: IFormFieldConfig[]; title?: string; className?: string }[];
  onSubmit?: (data: Record<string, FormFieldValue>) => void | Promise<void>;
  onCancel?: () => void;
  OnBack?: () => void;
  backLabel?: string;
  submitLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "popup";
  actionButtonsClassName?: string;
  loadingLabel?: string;
  contentWrapperClassName?: string;
}

export interface IFormContainerProps {
  formTitle?: string;
  fields: IFormFieldConfig[];
  formData: Record<string, FormFieldValue>;
  touched: Record<string, boolean>;
  errors: Record<string, string>;
  onFieldChange: (name: string, value: FormFieldValue) => void;
  variant?: "default" | "popup";
  className?: string;
}
