import ActionButtons from "../actionButtons/actionButtons";
import Title from "../title/title";
import styles from "./hero.module.scss";
export default function Hero({
  title,
  subtitle,
  titleType = "h1",
  titleVariant = "default",

  variant = "default",
  secondaryButtonLabel,
  primaryButtonLabel,
  isLoading = false,
  loadingLabel,
  onSecondaryClick,
  onPrimaryClick,
}: {
  variant?: "default" | "popup";
  title: string;
  titleType?: "h1" | "h2" | "h3";
  titleVariant?: "default" | "secondary";
  subtitle: string;
  primaryButtonLabel?: string;
  onPrimaryClick?: () => void;
  secondaryButtonLabel?: string;
  onSecondaryClick?: () => void;
  isLoading?: boolean;
  loadingLabel?: string;
}) {
  return (
    <div className={styles.hero}>
      <Title
        content={title || ""}
        subtitle={subtitle || ""}
        titleType={titleType}
        variant={titleVariant}
      />
      <ActionButtons
        loadingLabel={loadingLabel}
        variant={variant}
        cancelLabel={secondaryButtonLabel}
        submitLabel={primaryButtonLabel}
        isLoading={isLoading}
        onCancel={onSecondaryClick}
        onSubmit={onPrimaryClick}
      />
    </div>
  );
}
