"use client";

import { IYarnSchema } from "../../(types)/yarn.types";
import styles from "./yarnCard.module.scss";
import globalStyles from "../../(styles)/globals.module.scss";
import YarnMaterials from "../yarnMaterials/yarnMaterials";
import YarnColorTag from "../yarnColorTag/yarnColorTag";
import Image from "next/image";
import Button from "../button/button";
import Link from "../link/link";

export default function YarnCard({
  yarn,
  onclick,
  onDelete,
  disabled,
}: {
  yarn: IYarnSchema;
  onclick: (yarn: IYarnSchema) => void;
  disabled: (yarn: IYarnSchema) => boolean;
  onDelete: (yarn: IYarnSchema) => void;
}) {
  const isDisabled = disabled(yarn);
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
      <div className={styles["yarn-card-actions"]}>
        <button
          className={styles["yarn-card-actions-button"]}
          disabled={isDisabled}
          onClick={(e) => {
            e.stopPropagation();

            !isDisabled && onclick(yarn);
          }}
        >
          ...
        </button>
        <div className={styles["yarn-card-actions-buttons"]}>
          <Link
            variant="primary"
            href={`/crochet/yarns/edit/${yarn._id}`}
            displayIcon={false}
          >
            Edit
          </Link>
          <Button onclick={() => onDelete(yarn)} variant="secondary">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
