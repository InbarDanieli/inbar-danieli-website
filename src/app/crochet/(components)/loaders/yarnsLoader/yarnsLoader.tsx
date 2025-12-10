"use client";

import globalStyles from "../../../(styles)/globals.module.scss";
// import yarnStyles from "../../yarnCard/yarnCard.module.scss";
import styles from "./yarnsLoader.module.scss";

import { useEffect, useState } from "react";
import LoaderSkeleton from "../loaderSkeleton/loaderSkeleton";

export default function YarnsLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
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
