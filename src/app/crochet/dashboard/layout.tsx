import { Metadata } from "next";

// // Define the metadata specifically for crochet/dashboard
export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard for crochet Projects",
  };
  

export default function CrochetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

