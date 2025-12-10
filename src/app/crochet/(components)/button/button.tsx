"use client";

import { IoIosArrowBack } from "react-icons/io";
import styles from "./button.module.scss";

export default function Button({
  children,
  onclick,
  variant = "primary",
  disabled = false,
  type = "button",
  fontSize = "medium",
}: {
  children: React.ReactNode;
  onclick?: () => void;
  variant?: "primary" | "secondary" | "primary-full" | "secondary-full" | "primary-color" | "secondary-color" | "back";
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  fontSize?: "small" | "medium" | "large";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onclick}
      className={`${styles["button"]} ${styles[variant]} ${styles[fontSize]}`}
    >
      {variant === "back" && <IoIosArrowBack size={"1.3em"} />}
      {children}
    </button>
  );
}
