"use client";

import { TPatternPostType } from "@/types/pattern.types";
import { useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import styles from "./blockSelect.module.scss";

export default function BlockSelect({
  onSelect,
  selectedType,
  blockTypes,
  onClose,
  onTypeSelect,
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
  onTypeSelect: (e: React.MouseEvent<HTMLDivElement>, type: TPatternPostType) => void;
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
          onClick={(e) => {
            if (selectedType) {
              onTypeSelect(e, blockType.type);
              return;
            }
            onSelect(e, blockType.type);
          }}
        >
          <div className={styles["block-type-content"]}>
            {blockType.icon}
            <span className={styles["block-type-label"]}>
              {blockType.label}
            </span>
          </div>
          {selectedType === blockType.type && <FaCheck size={10} />}
        </div>
      ))}
    </div>
  );
}
