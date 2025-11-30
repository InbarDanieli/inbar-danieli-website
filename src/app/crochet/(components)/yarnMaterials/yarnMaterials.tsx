import { IYarnSchema } from "../../(types)/yarn.types";
import styles from "./yarnMaterials.module.scss";

export default function YarnMaterials({
  materials,
}: {
  materials: IYarnSchema["materials"];
}) {
  return (
    <div className={styles["yarn-materials"]}>
      {Object.entries(materials).map(([material, percentage], idx) => (
        <div key={material + idx} className={`${styles["yarn-material"]}`}>
          <span className={styles["material-name"]}>{material}:</span>
          <span className={styles["material-percentage"]}>{percentage}%</span>
        </div>
      ))}
    </div>
  );
}
