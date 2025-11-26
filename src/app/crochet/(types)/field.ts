export type FieldType =
  | "text"
  | "select"
  | "number"
  | "file"
  | "textarea"
  | "materials";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldProps {
  label: string;
  name: string;
  type?: FieldType;
  value?: string | number | Record<string, number>;
  placeholder?: string;
  required?: boolean;
  error?: string;
  options?: FieldOption[];
  accept?: string; // for file inputs
  onChange?: (
    value: string | number | File | null | Record<string, number>
  ) => void;
  onBlur?: () => void;
}

export interface MaterialEntry {
  id: string;
  name: string;
  percentage: number;
}

export interface MaterialsFieldProps {
  value?: Record<string, number>;
  error?: string;
  onChange?: (value: Record<string, number>) => void;
  onBlur?: () => void;
}
