import { technologyStack } from "@/app/(helpers)/technologyStack";
import styles from "./stack.module.scss";
import SectionTitle from "../sectionTitle/sectionTitle";

export default function TechnologyStack() {
  return (
    <div className={`${styles["stack-wrapper"]} wrapper have-padding`}>
      <SectionTitle title="Technology Stack" />
      <div className={styles["stack-list"]}>
        {technologyStack.map((stackItem, idx) => (
          <div className={styles["stack-item"]} key={stackItem + idx}>
            {stackItem}
          </div>
        ))}
      </div>
    </div>
  );
}
