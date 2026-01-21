"use client";

import { IFieldProps } from "@/types/field.types";
import { IPatternPost } from "@/types/pattern.types";
import { IImageScheme } from "@/types/yarn.types";
import React, { useCallback, useMemo } from "react";
import AbbreviationField from "../abbreviation/abbreviation";
import ColorPickerField from "../colorPickerField/colorPickerField";
import FileField from "../fileField/fileField";
import InputField from "../inputField/inputField";
import MaterialsField from "../materialsField/materialsField";
import NumberField from "../numberField/numberField";
import PatternContentField from "../patternContent/patternContent";
import SelectField from "../selectField/selectField";
import TextareaField from "../textareaField/textareaField";
import styles from "./field.module.scss";

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
  defaultValue,
}: IFieldProps) {
  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const displayLabel = useMemo(() => {
    return type !== "abbreviation" && type !== "pattern-content";
  }, [type]);

  const renderInput = useCallback(() => {
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
            value={value as IImageScheme | null}
            onChange={(val) => onChange?.(val as IImageScheme)}
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

      case "abbreviation":
        return (
          <AbbreviationField
            formTitle={label}
            value={value as Record<string, string>}
            error={error}
            onChange={(val) => onChange?.(val)}
            onBlur={onBlur}
          />
        );

      case "pattern-content":
        return (
          <PatternContentField
            value={value as IPatternPost[]}
            onChange={(val) => onChange?.(val as IPatternPost[])}
            onBlur={onBlur}
            formTitle={label}
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
            defaultValue={defaultValue}
          />
        );
    }
  }, [
    type,
    name,
    value,
    placeholder,
    required,
    error,
    options,
    accept,
    defaultValue,
    onChange,
    onBlur,
    handleInputChange,
    label,
  ]);

  return (
    <div className={styles.field}>
      {displayLabel && (
        <label htmlFor={name} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {renderInput()}
      {error && <span className={styles["error-message"]}>{error}</span>}
    </div>
  );
}
