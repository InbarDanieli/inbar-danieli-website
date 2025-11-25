"use client";

import { FaPlus } from "react-icons/fa";
import styles from "./link.module.scss";

export default function Button({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant: "primary" | "secondary";
}) {
  return (
    <a href={href} className={`${styles["link"]} ${styles[variant]}`}>
      <FaPlus  size={"0.7em"}/>
      {children}
    </a>
  );
}
