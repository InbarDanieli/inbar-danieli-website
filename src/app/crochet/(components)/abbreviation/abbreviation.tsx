"use client";

import {
  IAbbreviationEntry,
  IAbbreviationFieldProps,
} from "@/types/field.types";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Input from "../input/input";
import styles from "./abbreviation.module.scss";
export default function AbbreviationField({
  formTitle,
  value = {},
  error,
  onChange,
  onBlur,
}: IAbbreviationFieldProps) {
  const [abbreviations, setAbbreviations] = useState<IAbbreviationEntry[]>(
    () => {
      // Initialize from value prop
      if (Array.isArray(value) && value.length > 0) {
        return value;
      }
      // Start with one empty entry
      return [{ id: `${Date.now()}`, name: "", value: "" }];
    }
  );

  // Update parent when abbreviations change
  useEffect(() => {
    const abbreviationsObject: Record<string, string> = {};
    abbreviations.forEach((abbreviation) => {
      if (abbreviation.name.trim() !== "") {
        abbreviationsObject[abbreviation.name] = abbreviation.value;
      }
    });
    onChange?.(abbreviationsObject as Record<string, string>);
  }, [abbreviations]);

  const handleAbbreviationNameChange = (id: string, newName: string) => {
    setAbbreviations((prev) =>
      prev.map((abbreviation) =>
        abbreviation.id === id
          ? { ...abbreviation, name: newName }
          : abbreviation
      )
    );
  };

  const handleAbbreviationChange = (id: string, newAbbreviation: string) => {
    setAbbreviations((prev) =>
      prev.map((abbreviation) =>
        abbreviation.id === id
          ? { ...abbreviation, value: newAbbreviation }
          : abbreviation
      )
    );
  };

  const handleAddAbbreviation = () => {
    setAbbreviations((prev) => [
      ...prev,
      { id: `${Date.now()}`, name: "", value: "" },
    ]);
  };

  const removeAbbreviation = (id: string) => {
    setAbbreviations((prev) =>
      prev.filter((abbreviation) => abbreviation.id !== id)
    );
  };

  return (
    <div className={styles["abbreviation-field"]}>
      <div className={styles["abbreviation-header"]}>
        <h3>{formTitle}</h3>
        <button type="button" onClick={handleAddAbbreviation} className={styles["add-button"]}>
          <FaPlus size={10} />
          Add
        </button>
      </div>
      {abbreviations.map((abbreviation) => (
        <div className={styles["abbreviation-entry"]} key={abbreviation.id}>
          <Input
            error={!!error}
            placeholder="e.g. ch"
            value={abbreviation.name}
            onChange={(e) =>
              handleAbbreviationNameChange(abbreviation.id, e.target.value)
            }
            onBlur={onBlur}
            id={abbreviation.id}
            name={abbreviation.name}
            className={styles["abbreviation-input"]}
          />
          <Input
            error={!!error}
            placeholder="e.g. chain"
            value={abbreviation.value}
            onChange={(e) =>
              handleAbbreviationChange(abbreviation.id, e.target.value)
            }
            onBlur={onBlur}
            id={abbreviation.id}
            name={abbreviation.value}
            className={styles["abbreviation-input"]}
          />
          {abbreviations.length > 1 && (
            <button
              type="button"
              onClick={() => removeAbbreviation(abbreviation.id)}
              className={styles["remove-button"]}
              aria-label="Remove material"
            >
              <IoClose size={18} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
