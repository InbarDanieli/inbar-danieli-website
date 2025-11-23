import styles from "./progressBar.module.scss";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className={styles["progress-bar"]}>
      <div
        className={styles["progress-bar-fill"]}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
