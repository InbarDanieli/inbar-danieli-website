"use client";

import { FaPlus } from "react-icons/fa";
import styles from "./link.module.scss";

export default function Link({
  children,
  href,
  variant = "primary",
  displayIcon = true,
  fontSize = "medium",
  className,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "primary-color" | "secondary-color";
  displayIcon?: boolean;
  fontSize?: "small" | "medium" | "large";
  className?: string;
}) {
  return (
    <a href={href} className={`${styles["link"]} ${styles[variant]} ${styles[fontSize]} ${className}`}>
      {displayIcon && <FaPlus size={"0.7em"} />}
      {children}
    </a>
  );
}
