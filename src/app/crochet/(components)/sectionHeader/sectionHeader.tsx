import styles from "./sectionHeader.module.scss";

export default function SectionHeader({
  title,
  linkText,
  linkUrl,
}: {
  title: string;
  linkText: string;
  linkUrl: string;
}) {
  return (
    <div className={styles["section-header"]}>
      <h3>{title}</h3>
      <a href={linkUrl} rel="noopener noreferrer">
        {linkText}
      </a>
    </div>
  );
}
