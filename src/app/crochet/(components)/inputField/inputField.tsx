"use client";

import React, { useState } from "react";
import styles from "./inputField.module.scss";
import { IInputFieldProps } from "@/types/field.types";
import { FaEye } from "react-icons/fa";

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
  defaultValue,
}: IInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles["input-container"]}>
      <input
        id={id}
        name={name}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        min={min}
        className={`${styles.input} ${error ? styles.error : ""}`}
      />
      {value && type === "password" ? (
        <div
          onClick={handleShowPassword}
          className={`${styles["show-password-btn"]} ${
            showPassword ? styles.active : ""
          }`}
        >
          <FaEye />
        </div>
      ) : null}
    </div>
  );
}
