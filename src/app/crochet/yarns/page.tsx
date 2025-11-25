import type { Metadata } from "next";
import YarnSection from "./yarnSection";

// // Define the metadata specifically for crochet/dashboard
export const metadata: Metadata = {
  title: "Yarns",
  description: "Yarn list for crochet Projects",
};

export default function YarnsPage() {
  return <YarnSection />;
}
