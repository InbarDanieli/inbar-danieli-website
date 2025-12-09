import styles from "./sectionHeader.module.scss";

export default function SectionHeader({
  title,
  linkText,
  linkUrl,
  variant = "default",
}: {
  title: string;
  linkText: string;
  linkUrl: string;
  variant?: "default" | "disabled";
}) {
  return (
    <div className={`${styles["section-header"]} ${styles[variant]}`}>
      <h3>{title}</h3>
      <a  href={variant === "disabled" ? undefined : linkUrl} rel="noopener noreferrer">
        {linkText}
      </a>
    </div>
  );
}
