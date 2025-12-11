"use client";

import React, { useEffect } from "react";
import styles from "./fileField.module.scss";
import { useImageUpload } from "../../(hooks)/useImageUpload";

interface FileFieldProps {
  id: string;
  name: string;
  accept?: string;
  required?: boolean;
  folder?: string;
  value?: string;
  onChange?: (url: string) => void;
  onBlur?: () => void;
}

export default function FileField({
  id,
  name,
  accept,
  required = false,
  folder = "crochet",
  value,
  onChange,
  onBlur,
}: FileFieldProps) {
  const { upload, isUploading, progress, error, previewUrl, reset } =
    useImageUpload({
      folder,
      onSuccess: (result) => {
        onChange?.(result.url);
      },
    });

  // If there's an initial value (existing image URL), set it as preview
  const displayUrl = previewUrl || value;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await upload(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    onChange?.("");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <div className={styles["file-upload"]}>
      {!displayUrl ? (
        <>
          <input
            id={id}
            name={name}
            type="file"
            onChange={handleFileChange}
            onBlur={onBlur}
            accept={accept || "image/*"}
            required={required}
            disabled={isUploading}
          />
          <div
            className={`${styles["file-upload-content"]} ${
              isUploading ? styles.uploading : ""
            }`}
          >
            {isUploading ? (
              <>
                <div className={styles["progress-container"]}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p>Uploading... {progress}%</p>
              </>
            ) : (
              <>
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
                  {accept || "PNG, JPG or GIF (MAX. 10MB)"}
                </p>
              </>
            )}
          </div>
        </>
      ) : (
        <div className={styles["preview-container"]}>
          <img
            src={displayUrl}
            alt="Preview"
            className={styles["preview-image"]}
          />
          <button
            type="button"
            className={styles["remove-button"]}
            onClick={handleRemove}
            aria-label="Remove image"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
