"use client";

import { IoIosArrowBack } from "react-icons/io";
import globalStyles from "../../(styles)/globals.module.scss";
import { IActionElementProps } from "@/types/actionElement.types";
export default function Button({
  children,
  onclick,
  variant = "primary",
  disabled = false,
  type = "button",
  fontSize = "medium",
  className,
}: {
  onclick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
} & IActionElementProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={(e) => onclick && onclick(e)}
      className={`${globalStyles["button"]} ${globalStyles[variant]} ${globalStyles[fontSize]} ${className}`}
    >
      {variant === "back" && <IoIosArrowBack size={"1.3em"} />}
      {children}
    </button>
  );
}
