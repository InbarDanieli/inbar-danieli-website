import styles from "./title.module.scss";

export default function Title({
  content,
  subtitle,
  titleType = "h1",
  variant = "default",
}: {
  content?: string;
  subtitle?: string;
  titleType?: "h1" | "h2" | "h3";
  variant?: "default" | "secondary";
}) {
  function renderTitle() {
    if (!content) return null;
    if (titleType === "h1") return <h1>{content}</h1>;
    if (titleType === "h2") return <h2>{content}</h2>;
    if (titleType === "h3") return <h3>{content}</h3>;
    return <h1>{content}</h1>;
  }

  return (
    <div className={styles.title}>
      {renderTitle()}
      {subtitle && (
        <h4 className={`crochet-h4 secondary-text ${styles[variant]}`}>
          {subtitle}
        </h4>
      )}
    </div>
  );
}
