"use client";

import { INumberFieldProps } from "@/types/field.types";
import Input from "../input/input";

export default function NumberField({
  id,
  name,
  value,
  placeholder,
  required = false,
  error = false,
  min,
  onChange,
  onBlur,
}: INumberFieldProps) {
  return (
    <Input
      id={id}
      type="number"
      name={name}
      value={value}
      placeholder={placeholder}
      required={required}
      error={error}
      min={min}
      onChange={(e) => onChange?.(e.target.valueAsNumber || 0)}
      onBlur={onBlur}
    />
  );
}
