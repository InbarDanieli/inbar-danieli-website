import Title from "../title/title";
import styles from "./hero.module.scss";
export default function Hero({
  title,
  subtitle,
  titleType = "h1",
  titleVariant = "default",
  actionSection,
}: {
  title: string | React.ReactNode;
  titleType?: "h1" | "h2" | "h3";
  titleVariant?: "default" | "secondary";
  subtitle: string;
  actionSection?: React.ReactNode;
}) {
  return (
    <div className={styles.hero}>
      <Title
        content={title || ""}
        subtitle={subtitle || ""}
        titleType={titleType}
        variant={titleVariant}
      />
      {actionSection}
    </div>
  );
}
