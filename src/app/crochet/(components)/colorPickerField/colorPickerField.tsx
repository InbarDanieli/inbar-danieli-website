"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./colorPickerField.module.scss";
import { ColorPickerFieldProps } from "../../(types)/field";

export default function ColorPickerField({
  id,
  name,
  value = "",
  required = false,
  error = false,
  onChange,
  onBlur,
}: ColorPickerFieldProps) {
  const [color, setColor] = useState(value || "");
  const colorPickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setColor(value);
    }
  }, [value]);

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange?.(e);
  };

  const handleInputWrapperClick = () => {
    colorPickerRef.current?.click();
  };

  return (
    <div className={styles["color-picker-container"]}>
      <div
        className={`${styles["color-input-wrapper"]} ${
          error ? styles.error : ""
        }`}
        onClick={handleInputWrapperClick}
      >
        <input
          type="text"
          value={color.toUpperCase()}
          readOnly
          placeholder="Select color"
          className={styles["hex-input"]}
        />
      </div>
      <input
        ref={colorPickerRef}
        id={id}
        name={name}
        type="color"
        value={color || ""}
        onChange={handleColorPickerChange}
        onBlur={onBlur}
        required={required}
        className={`${styles["color-picker-button"]} ${
          color ? "" : styles.empty
        }`}
      />
    </div>
  );
}
