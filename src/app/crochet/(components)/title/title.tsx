import styles from "./title.module.scss";

export default function Title({
  content,
  subtitle,
}: {
  content: string;
  subtitle: string;
}) {
  return (
    <div className={styles.title}>
      <h1>{content}</h1>
      <h4 className={"crochet-h4 secondary-text"}>{subtitle}</h4>
    </div>
  );
}
