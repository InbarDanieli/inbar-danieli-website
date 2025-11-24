import type { Metadata } from "next";
import Title from "../(components)/title/title";
import YarnSection from "./yarnSection";
import styles from "./page.module.scss";

// // Define the metadata specifically for crochet/dashboard
export const metadata: Metadata = {
  title: "Yarns",
  description: "Yarn list for crochet Projects",
};

export default function YarnsPage() {
  return (
    <div className={`${styles["yarns-page"]} wrapper`}>
      <div className={styles.header}>
        <Title content={`My Yarn Stash`} subtitle="Your personal collection of yarns" />
        <a href="/crochet/yarns/add-yarn">Add Yarn</a>
      </div>
      <YarnSection />
    </div>
  );
}
