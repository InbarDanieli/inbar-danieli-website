"use client";

import globalStyles from "../../../(styles)/globals.module.scss";
import LoaderSkeleton from "../loaderSkeleton/loaderSkeleton";
import styles from "./yarnsLoader.module.scss";

export default function YarnsLoader() {

  return (
    <div className={styles["loader-wrapper"]}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          style={{alignItems: "center"}}
          className={`${styles["yarn-card"]} ${globalStyles["card-wrapper"]}`}
        >
          <LoaderSkeleton height="64px" width="64px" />
          <div className={styles["yarn-loader-content"]}>
            <LoaderSkeleton height="18px" width="40%"/>
            <LoaderSkeleton height="12px"/>
          </div>
        </div>
      ))}
    </div>
  );
}
