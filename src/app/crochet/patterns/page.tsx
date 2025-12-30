"use client";

import Hero from "../(components)/hero/hero";
import Link from "../(components)/link/link";
import { getAuthUser } from "../(helpers)/auth.helpers";
import globalStyles from "../(styles)/globals.module.scss";
import styles from "./page.module.scss";

export default function PatternsPage() {
  // const { data, isPending, error } = usePatterns();
  const user = getAuthUser();

  return (
    <div className={`${styles.page} patterns-page wrapper`}>
      <Hero
        title="Pattern Library"
        subtitle="Find you next crochet project"
        actionSection={
          <Link href="/crochet/patterns/create">Create New Pattern</Link>
        }
      />
      <div className={globalStyles["grid-section"]}></div>
    </div>
  );
}
