import Button from "../button/button";
import styles from "./actionButtons.module.scss";

export default function ActionButtons({
  onCancel,
  isSubmitting,
  cancelLabel,
  submitLabel,
  className,
}: {
  onCancel?: () => void;
  isSubmitting: boolean;
  cancelLabel?: string;
  submitLabel?: string;
  className?: string;
}) {
  return (
    <div className={`${styles.actions} ${className}`}>
      {onCancel && (
        <Button variant="secondary" onclick={onCancel} disabled={isSubmitting}>
          {cancelLabel}
        </Button>
      )}
      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : submitLabel}
      </Button>
    </div>
  );
}
