"use client";

import React from "react";
import styles from "./textareaField.module.scss";

interface TextareaFieldProps {
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  className?: string;
}

export default function TextareaField({
  id,
  name,
  value,
  placeholder,
  required = false,
  error = false,
  rows = 4,
  onChange,
  onBlur,
  className,
}: TextareaFieldProps) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className={`${styles.textarea} ${error ? styles.error : ""} ${className}`}
    />
  );
}

