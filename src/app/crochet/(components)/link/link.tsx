"use client";

import { FaPlus } from "react-icons/fa";
import globalStyles from "../../(styles)/globals.module.scss";
import { IActionElementProps } from "@/types/actionElement.types";
import { IoIosArrowBack } from "react-icons/io";

export default function Link({
  children,
  href,
  variant = "primary",
  displayIcon = true,
  fontSize = "medium",
  className,
}: {
  href: string;
  displayIcon?: boolean;
} & IActionElementProps) {
  return (
    <a
      href={href}
      className={`${globalStyles["link"]} ${globalStyles[variant]} ${globalStyles[fontSize]} ${className}`}
    >
      {displayIcon && variant !== "back" && <FaPlus size={"0.7em"} />}
      {variant === "back" && <IoIosArrowBack size={"1.3em"} />}
      {children}
    </a>
  );
}
