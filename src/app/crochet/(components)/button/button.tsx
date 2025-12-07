"use client";

import styles from "./button.module.scss";

export default function Button({
  children,
  onclick,
  variant = "primary",
  disabled = false,
  type = "button",
}: {
  children: React.ReactNode;
  onclick?: () => void;
  variant?: "primary" | "secondary" | "primary-full" | "secondary-full" | "primary-color" | "secondary-color";
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onclick}
      className={`${styles["button"]} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
