"use client";

import { IInputFieldProps } from "@/types/field.types";
import styles from "../inputField/inputField.module.scss";

export default function Input({
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
  defaultValue,
  className,
}: IInputFieldProps) {
  return (
    <div className={styles["input-container"]}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        min={min}
        className={`${styles.input} ${error ? styles.error : ""} ${className}`}
      />
    </div>
  );
}
