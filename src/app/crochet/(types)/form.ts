import { FieldProps, FieldType } from "./field";

export type FormFieldValue = string | number | File | null | Record<string, number>;

export interface FormFieldConfig extends Omit<FieldProps, "error" | "onBlur"> {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  gridColumn?: "full" | "half"; // for responsive layout
  validate?: (value: FormFieldValue) => string | undefined;
}

export interface FormProps {
  title?: string;
  subtitle?: string;
  fields: FormFieldConfig[];
  onSubmit: (data: Record<string, FormFieldValue>) => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}