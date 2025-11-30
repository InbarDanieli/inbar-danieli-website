"use client";

import { IYarnSchema } from "../../(types)/yarn.types";
import styles from "./yarnCard.module.scss";
import globalStyles from "../../(styles)/globals.module.scss";
import YarnMaterials from "../yarnMaterials/yarnMaterials";
import YarnColorTag from "../yarnColorTag/yarnColorTag";
import Image from "next/image";

export default function YarnCard({ yarn }: { yarn: IYarnSchema }) {
  return (
    <div className={`${styles["yarn-card"]} ${globalStyles["card-wrapper"]}`}>
      {yarn.image && (
        <Image src={yarn.image} alt={yarn.name} width={100} height={100} />
      )}

      <div className={styles["yarn-card-content"]}>
        <h4>{yarn.name}</h4>
        <p className={`${styles["yarn-card-company"]} secondary-text`}>
          {yarn.company}
        </p>
        <div className={styles["yarn-info"]}>
          {(yarn.color || yarn.colorTag) && (
            <YarnColorTag color={yarn.color} colorTag={yarn.colorTag} />
          )}
          {yarn?.materials && (yarn.color || yarn.colorTag) && (
            <div className={styles["separator"]}></div>
          )}
          {yarn?.materials && <YarnMaterials materials={yarn.materials} />}
        </div>
      </div>
    </div>
  );
}
