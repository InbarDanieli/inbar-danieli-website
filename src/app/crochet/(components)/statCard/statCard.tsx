import styles from "./statCard.module.scss";

export default function StatCard({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <div className={styles["card-wrapper"]}>
      <h4 className={"crochet-h4"}>{title}</h4>
      <h2>{count}</h2>
    </div>
  );
}
