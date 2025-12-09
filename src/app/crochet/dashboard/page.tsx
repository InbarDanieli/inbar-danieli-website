// "use client";

import type { Metadata } from "next";
import Title from "../(components)/title/title";
import styles from "./page.module.scss";
import globalStyles from "../(styles)/globals.module.scss";
import StatCard from "../(components)/statCard/statCard";
import SectionHeader from "../(components)/sectionHeader/sectionHeader";
import ProgressPatternsSection from "../(components)/progressPatternsSection/progressPatternsSection";
import { progressPatterns } from "../(demoData)/petterns";
import YarnStashSection from "../(components)/yarnStashSection/yarnStashSection";
import { yarns } from "../(demoData)/yarns";
import { getDetailedTimeOfDay } from "../(helpers)/getTimeOfDay";

export const patternsComingSoon = true;

// // Define the metadata specifically for crochet/dashboard
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for crochet Projects",
};

export default function Dashboard() {
  const { timeCategory } = getDetailedTimeOfDay();
  const userName = "Inbar";

  return (
    <div className={`${styles.page} dashboard-page wrapper`}>
      <div className={styles.header}>
        <Title
          content={`Good ${timeCategory}, ${userName}!`}
          subtitle="Here's a look at your crochet world today"
        />
      </div>

      <div className={globalStyles["grid-section"]}>
        <StatCard title="Yarn Stash" count={124} />
        <StatCard title="Patterns in Progress" count={2} />
        <StatCard title="All Patterns" count={20} />
      </div>

      <div className={styles["patterns-section-wrapper"]}>
        <SectionHeader
          variant="disabled"
          title={patternsComingSoon ? "Patterns" : "Continue Your work"}
          linkText={patternsComingSoon ? "Coming soon!" : "View All Patterns"}
          linkUrl="/crochet/patterns"
        />
        <ProgressPatternsSection cards={progressPatterns} />
      </div>

      <div className={styles["yarns-section-wrapper"]}>
        <SectionHeader
          title="New in Stash"
          linkText="View All Yarns"
          linkUrl="/crochet/yarns"
        />
        <YarnStashSection yarns={yarns} />
      </div>
    </div>
  );
}
