"use client";

import React from "react";
import styles from "./fileField.module.scss";

interface FileFieldProps {
  id: string;
  name: string;
  accept?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

export default function FileField({
  id,
  name,
  accept,
  required = false,
  onChange,
  onBlur,
}: FileFieldProps) {
  return (
    <div className={styles["file-upload"]}>
      <input
        id={id}
        name={name}
        type="file"
        onChange={onChange}
        onBlur={onBlur}
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
          <span className={styles.highlight}>Click to upload</span> or drag and
          drop
        </p>
        <p className={styles["file-info"]}>
          {accept || "PNG, JPG or GIF (MAX. 800x400px)"}
        </p>
      </div>
    </div>
  );
}

