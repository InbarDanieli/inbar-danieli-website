import type { Metadata } from "next";

// // Define the metadata specifically for crochet/dashboard
export const metadata: Metadata = {
  title: "Yarns",
  description: "Yarn list for crochet Projects",
};

export default function YarnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
