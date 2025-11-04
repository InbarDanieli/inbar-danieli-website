import { technologyStack } from "@/app/(helpers)/technologyStack";
import styles from "./stack.module.scss";

export default function TechnologyStack() {
  return (
    <div className={`${styles["stack-wrapper"]} wrapper have-padding`}>
      <h2>Technology Stack</h2>
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
