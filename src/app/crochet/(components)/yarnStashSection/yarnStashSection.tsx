"use client";

import EmptySection from "../emptySection/emptySection";
import styles from "./yarnStashSection.module.scss";
import { PiYarn } from "react-icons/pi";
import { IYarnSchema } from "@/types/yarn.types";
import YarnsLoader from "../loaders/yarnsLoader/yarnsLoader";
import YarnCard from "../yarnCard/yarnCard";

export default function YarnStashSection({
  yarns,
  loading = true,
}: {
  yarns: IYarnSchema[];
  loading: boolean;
}) {
  if (loading) {
    return <YarnsLoader />;
  }

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
        <YarnCard key={yarn._id} yarn={yarn} enableActions={false} />
      ))}
    </div>
  );
}
