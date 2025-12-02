"use client";

import { FaPlus } from "react-icons/fa";
import styles from "./link.module.scss";

export default function Link({
  children,
  href,
  variant = "primary",
  displayIcon = true,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  displayIcon?: boolean;
}) {
  return (
    <a href={href} className={`${styles["link"]} ${styles[variant]}`}>
      {displayIcon && <FaPlus size={"0.7em"} />}
      {children}
    </a>
  );
}
