"use client";

import React from "react";
import styles from "./inputField.module.scss";

interface InputFieldProps {
  id: string;
  name: string;
  type?: "text" | "number";
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  min?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

export default function InputField({
  id,
  name,
  type = "text",
  value,
  placeholder,
  required = false,
  error = false,
  min,
  onChange,
  onBlur,
}: InputFieldProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      required={required}
      min={min}
      className={`${styles.input} ${error ? styles.error : ""}`}
    />
  );
}

