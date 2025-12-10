import EmptySection from "../emptySection/emptySection";
import styles from "./yarnStashSection.module.scss";
import { PiYarn } from "react-icons/pi";
import globalStyles from "../../(styles)/globals.module.scss";
import { IYarnSchema } from "@/types/yarn.types";

export default function YarnStashSection({ yarns }: { yarns: IYarnSchema[] }) {
  if (yarns.length <= 0) {
    return (
      <EmptySection
        title="Your stash is empty"
        description={`Add your first yarn to start your yarn collection.`}
        icon={<PiYarn size={50} />}
        variant="pattern"
      />
    );
  }

  return (
    <div className={styles["yarn-stash-section"]}>
      {yarns.map((yarn) => (
        <div className={`${styles["yarn-item"]} ${globalStyles["card-wrapper"]}`} key={yarn._id}>
          <img src={yarn.image} alt={yarn.name} />
          <div className={styles["yarn-item-content"]}>
            <h4>{yarn.name}</h4>
            <p className={`${styles["yarn-item-company"]} secondary-text`}>
              {yarn.company}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
