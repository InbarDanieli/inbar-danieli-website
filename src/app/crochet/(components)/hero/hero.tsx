import Link from "../link/link";
import Title from "../title/title";
import styles from "./hero.module.scss";
export default function Hero({
  title,
  subtitle,
  titleType = "h1",
  titleVariant = "default",
  actionSection,
  backButtonText,
  backButtonLink,
}: {
  title: string | React.ReactNode;
  titleType?: "h1" | "h2" | "h3";
  titleVariant?: "default" | "secondary";
  subtitle: string;
  actionSection?: React.ReactNode;
  backButtonText?: string;
  backButtonLink?: string;
}) {
  return (
    <>
      {backButtonText && backButtonLink && (
        <Link className={styles.backButton} href={backButtonLink} variant="back">
          {backButtonText}
        </Link>
      )}
      <div className={styles.hero}>
        <Title
          content={title || ""}
          subtitle={subtitle || ""}
          titleType={titleType}
          variant={titleVariant}
        />
        {actionSection}
      </div>
    </>
  );
}
