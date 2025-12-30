import type { Metadata } from "next";

// // Define the metadata specifically for crochet/dashboard
export const metadata: Metadata = {
  title: "Patterns",
  description: "Crochet Pattern list",
};

export default function PatternsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
