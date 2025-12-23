"use client";

import React, { useState, useRef } from "react";
import styles from "./fileField.module.scss";
import { IYarnImage } from "@/types/yarn.types";
import Image from "next/image";

interface FileFieldProps {
  id: string;
  name: string;
  accept?: string;
  required?: boolean;
  value?: IYarnImage | null;
  onChange?: (value: IYarnImage | null) => void;
  onBlur?: () => void;
}

export default function FileField({
  id,
  name,
  accept,
  required = false,
  value,
  onChange,
  onBlur,
}: FileFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value?.src || null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    // Create local preview
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || result.status !== 200) {
        throw new Error(result.message || "Upload failed");
      }

      // Update with Cloudinary URL
      setPreviewUrl(result.data.src);
      onChange?.(result.data);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload image");
      setPreviewUrl(null);
      onChange?.(null);
    } finally {
      setIsUploading(false);
      // Clean up local preview URL
      URL.revokeObjectURL(localPreview);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPreviewUrl(null);
    setError(null);
    onChange?.(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const hasImage = previewUrl || value?.src;

  return (
    <div className={styles["file-upload"]}>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        onChange={handleFileSelect}
        onBlur={onBlur}
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        required={required && !hasImage}
        disabled={isUploading}
      />
      
      {hasImage ? (
        <div className={styles["preview-container"]}>
          <Image
            width={650}
            height={150}
            src={previewUrl || value?.src || ""}
            alt="Preview"
            className={styles["preview-image"]}
          />
          <button
            type="button"
            className={styles["remove-button"]}
            onClick={handleRemove}
            aria-label="Remove image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {isUploading && (
            <div className={styles["uploading-overlay"]}>
              <div className={styles["spinner"]} />
              <span>Uploading...</span>
            </div>
          )}
        </div>
      ) : (
        <div className={`${styles["file-upload-content"]} ${isUploading ? styles.uploading : ""}`}>
          {isUploading ? (
            <>
              <div className={styles["spinner"]} />
              <p>Uploading image...</p>
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
                <span className={styles.highlight}>Click to upload</span> or drag and
                drop
              </p>
              <p className={styles["file-info"]}>
                {accept || "PNG, JPG, GIF or WebP (MAX. 5MB)"}
              </p>
            </>
          )}
        </div>
      )}
      
      {error && <p className={styles["error-message"]}>{error}</p>}
    </div>
  );
}
