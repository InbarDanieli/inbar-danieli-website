"use client";

import React from "react";
import styles from "../inputField/inputField.module.scss";
import { INumberFieldProps } from "../../(types)/field.types";


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
    <input
      id={id}
      name={name}
      type={"number"}
      value={value}
      onChange={(e) => onChange?.(e.target.valueAsNumber || 0)}
      onBlur={onBlur}
      placeholder={placeholder}
      required={required}
      min={min}
      className={`${styles.input} ${error ? styles.error : ""}`}
    />
  );
}

