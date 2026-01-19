"use client";

import { useEffect, useRef } from "react";
import { TPatternPostType } from "@/types/pattern.types";
import styles from "./blockSelect.module.scss";

export default function BlockSelect({
  onSelect,
  selectedType,
  blockTypes,
  onClose,
}: {
  onSelect: (
    e: React.MouseEvent<HTMLDivElement>,
    type: TPatternPostType
  ) => void;
  selectedType?: TPatternPostType;
  blockTypes: {
    type: TPatternPostType;
    label: string;
    icon: React.ReactNode;
  }[];
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={styles["block-select-container"]}>
      {blockTypes.map((blockType) => (
        <div
          className={styles["block-type"]}
          key={blockType.type}
          onClick={(e) => onSelect(e, blockType.type)}
        >
          {blockType.icon}
          <span className={styles["block-type-label"]}>{blockType.label}</span>
        </div>
      ))}
    </div>
  );
}
