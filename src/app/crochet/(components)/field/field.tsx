"use client";

import React from "react";
import styles from "./field.module.scss";
import { FieldProps } from "../../(types)/field";
import MaterialsField from "../materialsField/materialsField";

export default function Field({
  label,
  name,
  type = "text",
  value,
  placeholder,
  required = false,
  error,
  options = [],
  accept,
  onChange,
  onBlur,
}: FieldProps) {
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      onChange?.(files && files.length > 0 ? files[0] : null);
    } else {
      onChange?.(e.target.value);
    }
  };

  const renderInput = () => {
    const commonProps = {
      id: name,
      name,
      onBlur,
      className: `${styles.input} ${error ? styles.error : ""}`,
    };

    switch (type) {
      case "select":
        return (
          <select
            {...commonProps}
            value={value as string}
            onChange={handleInputChange}
            required={required}
          >
            <option value="" disabled>
              {placeholder || `Select a ${label.toLowerCase()}...`}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "textarea":
        return (
          <textarea
            {...commonProps}
            value={value as string}
            onChange={handleInputChange}
            placeholder={placeholder}
            required={required}
            rows={4}
          />
        );

      case "file":
        return (
          <div className={styles["file-upload"]}>
            <input
              {...commonProps}
              type="file"
              onChange={handleInputChange}
              accept={accept}
              required={required}
            />
            <div className={styles["file-upload-content"]}>
              <svg
                className={styles["upload-icon"]}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p>
                <span className={styles.highlight}>Click to upload</span> or
                drag and drop
              </p>
              <p className={styles["file-info"]}>
                {accept || "PNG, JPG or GIF (MAX. 800x400px)"}
              </p>
            </div>
          </div>
        );

      case "number":
        return (
          <input
            {...commonProps}
            type="number"
            value={value as number}
            onChange={handleInputChange}
            placeholder={placeholder}
            required={required}
            min={0}
          />
        );

      case "materials":
        return (
          <MaterialsField
            value={value as Record<string, number>}
            error={error}
            onChange={(val) => onChange?.(val)}
            onBlur={onBlur}
          />
        );
      default:
        return (
          <input
            {...commonProps}
            type="text"
            value={value as string}
            onChange={handleInputChange}
            placeholder={placeholder}
            required={required}
          />
        );
    }
  };

  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {renderInput()}
      {error && <span className={styles["error-message"]}>{error}</span>}
    </div>
  );
}
