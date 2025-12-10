"use client";

import { FaPlus } from "react-icons/fa";
import styles from "./link.module.scss";

export default function Link({
  children,
  href,
  variant = "primary",
  displayIcon = true,
  fontSize = "medium",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "primary-color" | "secondary-color";
  displayIcon?: boolean;
  fontSize?: "small" | "medium" | "large";
}) {
  return (
    <a href={href} className={`${styles["link"]} ${styles[variant]} ${styles[fontSize]}`}>
      {displayIcon && <FaPlus size={"0.7em"} />}
      {children}
    </a>
  );
}
