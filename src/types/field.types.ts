import { HTMLInputTypeAttribute } from "react";
import { IYarnImage } from "./yarn.types";
import { FormFieldValue } from "./form.types";

export type TFieldType =
  | "password"
  | "text"
  | "select"
  | "number"
  | "file"
  | "textarea"
  | "materials"
  | "color";

export interface IFieldOption {
  label: string;
  value: string;
}


export interface IFieldProps {
  label: string;
  name: string;
  type?: TFieldType;
  value?: FormFieldValue;
  placeholder?: string;
  required?: boolean;
  error?: string;
  options?: IFieldOption[];
  accept?: string; // for file inputs
  onChange?: (
    value: string | number | File | null | Record<string, number> | IYarnImage
  ) => void;
  onBlur?: () => void;
  defaultValue?: string | number;
}

export interface IMaterialEntry {
  id: string;
  name: string;
  percentage: number;
}

export interface IMaterialsFieldProps {
  value?: Record<string, number>;
  error?: string;
  onChange?: (value: Record<string, number>) => void;
  onBlur?: () => void;
}

// color picker field props
export interface IColorPickerFieldProps {
  id: string;
  name: string;
  value?: string;
  required?: boolean;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}


export interface IInputFieldProps {
  id: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  min?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  defaultValue?: string | number;
}

export interface INumberFieldProps
  extends Omit<IInputFieldProps, "value" | "onChange"> {
  value: number;
  onChange: (value: number) => void;
}
