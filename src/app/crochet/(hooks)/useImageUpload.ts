"use client";

import { useState, useCallback } from "react";

interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

interface UseImageUploadOptions {
  folder?: string;
  onSuccess?: (result: UploadResult) => void;
  onError?: (error: Error) => void;
}

interface UseImageUploadReturn {
  upload: (file: File) => Promise<UploadResult | null>;
  isUploading: boolean;
  progress: number;
  error: string | null;
  previewUrl: string | null;
  uploadedUrl: string | null;
  reset: () => void;
}

export function useImageUpload(
  options: UseImageUploadOptions = {}
): UseImageUploadReturn {
  const { folder = "crochet", onSuccess, onError } = options;

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const reset = useCallback(() => {
    setIsUploading(false);
    setProgress(0);
    setError(null);
    setPreviewUrl(null);
    setUploadedUrl(null);
  }, []);

  const upload = useCallback(
    async (file: File): Promise<UploadResult | null> => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        const err = new Error("Please select an image file");
        setError(err.message);
        onError?.(err);
        return null;
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        const err = new Error("File size must be less than 10MB");
        setError(err.message);
        onError?.(err);
        return null;
      }

      // Create local preview immediately
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);

      setIsUploading(true);
      setProgress(0);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        // Simulate progress (since fetch doesn't support progress for uploads easily)
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 10, 90));
        }, 100);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        clearInterval(progressInterval);

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Upload failed");
        }

        const result: UploadResult = await response.json();

        setProgress(100);
        setUploadedUrl(result.url);
        onSuccess?.(result);

        // Clean up local preview since we now have the Cloudinary URL
        URL.revokeObjectURL(localPreview);
        setPreviewUrl(result.url);

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Upload failed");
        setError(error.message);
        onError?.(error);
        URL.revokeObjectURL(localPreview);
        setPreviewUrl(null);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onSuccess, onError]
  );

  return {
    upload,
    isUploading,
    progress,
    error,
    previewUrl,
    uploadedUrl,
    reset,
  };
}


