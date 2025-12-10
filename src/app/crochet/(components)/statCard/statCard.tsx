import styles from "./statCard.module.scss";
import globalStyles from "../../(styles)/globals.module.scss";
import LoaderSkeleton from "../loaders/loaderSkeleton/loaderSkeleton";

export default function StatCard({
  title,
  count,
  loading = false,
  disabled = false,
}: {
  title: string;
  count: number;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className={`${styles["card-wrapper"]} ${globalStyles["card-wrapper"]}`}
    >
      <h4 className={"crochet-h4"}>{title}</h4>
      {loading ? (
        <LoaderSkeleton height="40px" width="100px" />
      ) : (
        <>{disabled ? <h2  className={styles["coming-soon"]}>Coming soon!</h2> : <h2>{count}</h2>}</>
      )}
    </div>
  );
}
