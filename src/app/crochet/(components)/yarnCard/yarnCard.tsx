"use client";

import { IYarnSchema } from "../../(types)/yarn";
import styles from "./yarnCard.module.scss";
import globalStyles from "../../(styles)/globals.module.scss";
import YarnMaterials from "../yarnMaterials/yarnMaterials";
import YarnColorTag from "../yarnColorTag/yarnColorTag";

export default function YarnCard({ yarn }: { yarn: IYarnSchema }) {
  return (
    <div className={`${styles["yarn-card"]} ${globalStyles["card-wrapper"]}`}>
      <img src={yarn.image} alt={yarn.name} />

      <div className={styles["yarn-card-content"]}>
        <h4>{yarn.name}</h4>
        <p className={`${styles["yarn-card-company"]} secondary-text`}>
          {yarn.company}
        </p>
        <div className={styles["yarn-info"]}>
          <YarnColorTag color={yarn.color} colorTag={yarn.colorTag} />
          <div className={styles["separator"]}></div>
          <YarnMaterials materials={yarn.materials} />
        </div>
      </div>
    </div>
  );
}
