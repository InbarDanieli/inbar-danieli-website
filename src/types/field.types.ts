import { HTMLInputTypeAttribute } from "react";
import { FormFieldValue } from "./form.types";
import { IPatternPost } from "./pattern.types";

export type TFieldType =
  | "password"
  | "text"
  | "select"
  | "number"
  | "file"
  | "textarea"
  | "materials"
  | "abbreviation"
  | "pattern-content"
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
  onChange?: (value: FormFieldValue) => void;
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

export interface IAbbreviationEntry {
  id: string;
  name: string;
  value: string;
}

export interface IAbbreviationFieldProps {
  value?: Record<string, string>;
  error?: string;
  onChange?: (value: Record<string, string>) => void;
  onBlur?: () => void;
  formTitle?: string;
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
  className?: string;
  variant?: "default" | "title-input";
}

export interface INumberFieldProps
  extends Omit<IInputFieldProps, "value" | "onChange"> {
  value: number;
  onChange: (value: number) => void;
}

export interface IPatternContentFieldProps {
  value: IPatternPost[];
  onChange: (value: IPatternPost[]) => void;
  onBlur?: () => void;
  formTitle?: string;
}
