import styles from "./sectionTitle.module.scss";

export default function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className={styles["section-title-wrapper"]}>
      <h2>{title}</h2>
      {description && <h5>{description}</h5>}
    </div>
  );
}
