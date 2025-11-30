"use client";

import React from "react";
import styles from "./field.module.scss";
import { IFieldProps } from "../../(types)/field.types";
import MaterialsField from "../materialsField/materialsField";
import InputField from "../inputField/inputField";
import SelectField from "../selectField/selectField";
import TextareaField from "../textareaField/textareaField";
import FileField from "../fileField/fileField";
import ColorPickerField from "../colorPickerField/colorPickerField";
import NumberField from "../numberField/numberField";

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
}: IFieldProps) {
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
    switch (type) {
      case "select":
        return (
          <SelectField
            id={name}
            name={name}
            value={value as string}
            onChange={handleInputChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            error={!!error}
            options={options}
            label={label}
          />
        );

      case "textarea":
        return (
          <TextareaField
            id={name}
            name={name}
            value={value as string}
            onChange={handleInputChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            error={!!error}
            rows={4}
          />
        );

      case "file":
        return (
          <FileField
            id={name}
            name={name}
            onChange={handleInputChange}
            onBlur={onBlur}
            accept={accept}
            required={required}
          />
        );

      case "number":
        return (
          <NumberField
            id={name}
            name={name}
            value={value as number}
            onChange={(value) => onChange?.(value)}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            error={!!error}
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

      case "color":
        return (
          <ColorPickerField
            id={name}
            name={name}
            value={value as string}
            onChange={handleInputChange}
            onBlur={onBlur}
            required={required}
            error={!!error}
          />
        );

      default:
        return (
          <InputField
            id={name}
            name={name}
            type={type}
            value={value as string}
            onChange={handleInputChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            error={!!error}
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
