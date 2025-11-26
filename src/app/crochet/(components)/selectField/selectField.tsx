"use client";

import React from "react";
import styles from "./selectField.module.scss";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  options: SelectOption[];
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: () => void;
}

export default function SelectField({
  id,
  name,
  value,
  placeholder,
  required = false,
  error = false,
  options,
  label,
  onChange,
  onBlur,
}: SelectFieldProps) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      className={`${styles.select} ${error ? styles.error : ""}`}
    >
      <option value="" disabled>
        {placeholder || `Select a ${label?.toLowerCase()}...`}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

