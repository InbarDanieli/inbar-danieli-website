"use client";

import React, { useState, useRef } from "react";
import styles from "./multiFileField.module.scss";
import { IImageScheme } from "@/types/yarn.types";
import Image from "next/image";

interface MultiFileFieldProps {
  id: string;
  name: string;
  accept?: string;
  required?: boolean;
  value?: IImageScheme[] | null;
  onChange?: (value: IImageScheme[] | null) => void;
  onBlur?: () => void;
  maxImages?: number;
  gridClassName?: string;
}

export default function MultiFileField({
  id,
  name,
  accept,
  required = false,
  value,
  onChange,
  onBlur,
  maxImages,
  gridClassName
}: MultiFileFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [previewUrls, setPreviewUrls] = useState<string[]>(() => {
    if (!value) return [];
    return value.map((v) => v.src);
  });
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get current images as array
  const currentImages: IImageScheme[] = value || [];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);

    // Check max images limit
    const totalImages = currentImages.length + files.length;
    if (maxImages && totalImages > maxImages) {
      setError(
        `Maximum ${maxImages} images allowed. You can add ${maxImages - currentImages.length} more.`
      );
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    setUploadingCount(files.length);

    const localPreviews: string[] = [];

    // Create local previews for all files
    Array.from(files).forEach((file) => {
      const localPreview = URL.createObjectURL(file);
      localPreviews.push(localPreview);
    });

    setPreviewUrls([...previewUrls, ...localPreviews]);

    try {
      const uploadedImages: IImageScheme[] = [];

      // Upload all files
      for (const file of Array.from(files)) {
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

        uploadedImages.push(result.data);
        setUploadingCount((prev) => prev - 1);
      }

      // Update with uploaded URLs
      const allImages = [...currentImages, ...uploadedImages];
      setPreviewUrls(allImages.map((img) => img.src));
      onChange?.(allImages);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload images");
      // Revert to previous state
      setPreviewUrls(currentImages.map((img) => img.src));
    } finally {
      setIsUploading(false);
      setUploadingCount(0);
      // Clean up local preview URLs
      localPreviews.forEach((url) => URL.revokeObjectURL(url));
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);

    const newImages = currentImages.filter((_, i) => i !== index);
    setPreviewUrls(newImages.map((img) => img.src));
    onChange?.(newImages.length > 0 ? newImages : null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const hasImages = previewUrls.length > 0 || currentImages.length > 0;
  const canAddMore = !maxImages || currentImages.length < maxImages;

  return (
    <div className={styles["file-upload"]}>
      {/* Images grid */}
      {hasImages && (
        <div className={`${styles["images-grid"]} ${gridClassName}`}>
          {currentImages.map((image, index) => (
            <div key={image.src || index} className={styles["preview-container"]}>
              <Image
                width={200}
                height={150}
                src={previewUrls[index] || image.src}
                alt={`Preview ${index + 1}`}
                className={styles["preview-image"]}
              />
              <button
                type="button"
                className={styles["remove-button"]}
                onClick={(e) => handleRemove(e, index)}
                aria-label={`Remove image ${index + 1}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
          {isUploading && uploadingCount > 0 && (
            <div className={styles["uploading-placeholder"]}>
              <div className={styles["spinner"]} />
              <span>Uploading {uploadingCount}...</span>
            </div>
          )}
        </div>
      )}

      {/* Upload area - show when there's space for more images */}
      {canAddMore && (
        <div className={hasImages ? styles["upload-area-compact"] : undefined}>
          <input
            ref={inputRef}
            id={id}
            name={name}
            type="file"
            onChange={handleFileSelect}
            onBlur={onBlur}
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            required={required && !hasImages}
            disabled={isUploading}
            multiple
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
              <span className={styles.highlight}>Click to upload</span> or drag and drop
            </p>
            <p className={styles["file-info"]}>
              {accept || "PNG, JPG, GIF or WebP (MAX. 5MB)"}
              {maxImages && (
                <span className={styles["image-count"]}>
                  {" "}• {currentImages.length}/{maxImages} images
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {error && <p className={styles["error-message"]}>{error}</p>}
    </div>
  );
}
