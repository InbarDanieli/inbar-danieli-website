import { IFieldProps, TFieldType } from "./field.types";

export type FormFieldValue = string | number | File | null | Record<string, number>;

export interface IFormFieldConfig extends Omit<IFieldProps, "error" | "onBlur"> {
  name: string;
  label: string;
  type?: TFieldType;
  required?: boolean;
  gridColumn?: "full" | "half"; // for responsive layout
  validate?: (value: FormFieldValue) => string | undefined;
}

export interface IFormProps {
  title?: string;
  subtitle?: string;
  fields: IFormFieldConfig[];
  onSubmit?: (data: Record<string, FormFieldValue>) => void | Promise<void>;
  onCancel?: () => void;
  OnBack?: () => void;
  backLabel?: string;
  submitLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "popup";
  actionButtonsClassName?: string;
  loadingLabel?: string;
}