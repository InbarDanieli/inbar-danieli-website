import { IoClose } from "react-icons/io5";
import Button from "../button/button";
import styles from "./actionButtons.module.scss";

export default function ActionButtons({
  onCancel,
  isLoading,
  cancelLabel,
  submitLabel,
  className,
  onSubmit,
  variant = "default",
}: {
  onCancel?: () => void;
  isLoading: boolean;
  cancelLabel?: string;
  submitLabel?: string;
  className?: string;
  onSubmit?: () => void;
  variant?: "default" | "popup";
}) {
  return (
    <div className={`${styles.actions} ${className}`}>
      {onCancel && (
        <>
          {variant === "default" ? (
            <Button variant="secondary" onclick={onCancel} disabled={isLoading}>
              {cancelLabel}
            </Button>
          ) : (
            <button
              type="button"
              className={styles.closeButton}
              onClick={onCancel}
              aria-label="Close popup"
            >
              <IoClose size="1.5em" />
            </button>
          )}
        </>
      )}

      <Button
        onclick={onSubmit || undefined}
        variant="primary"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : submitLabel}
      </Button>
    </div>
  );
}
