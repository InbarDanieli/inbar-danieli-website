import styles from "./yarnColorTag.module.scss";

export default function YarnColorTag({
  color,
  colorTag,
}: {
  color: string;
  colorTag: string;
}) {
  return (
    <div className={`${styles["yarn-color-tag-wrapper"]}`} >
      <div
        style={{ backgroundColor: color }}
        className={styles["yarn-color"]}
      ></div>
      <p className={`${styles["yarn-color-tag"]} secondary-text`}>#{colorTag}</p>
    </div>
  );
}
