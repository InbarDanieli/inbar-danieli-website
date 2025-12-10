"use client";

import React, { useState, useEffect } from "react";
import styles from "./materialsField.module.scss";
import { IoAddCircleOutline, IoCloseCircle } from "react-icons/io5";
import { IMaterialEntry, IMaterialsFieldProps } from "@/types/field.types";


export default function MaterialsField({
  value = {},
  error,
  onChange,
  onBlur,
}: IMaterialsFieldProps) {
  const [materials, setMaterials] = useState<IMaterialEntry[]>(() => {
    // Initialize from value prop
    if (Object.keys(value).length > 0) {
      return Object.entries(value).map(([name, percentage], index) => ({
        id: `${Date.now()}-${index}`,
        name,
        percentage,
      }));
    }
    // Start with one empty entry
    return [{ id: `${Date.now()}-0`, name: "", percentage: 0 }];
  });

  // Update parent when materials change
  useEffect(() => {
    const materialsObject: Record<string, number> = {};
    materials.forEach((material) => {
      if (material.name.trim() !== "") {
        materialsObject[material.name] = material.percentage;
      }
    });
    onChange?.(materialsObject);
  }, [materials]);

  const handleMaterialNameChange = (id: string, newName: string) => {
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === id ? { ...material, name: newName } : material
      )
    );
  };

  const handleMaterialPercentageChange = (
    id: string,
    newPercentage: number
  ) => {
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === id
          ? { ...material, percentage: newPercentage }
          : material
      )
    );
  };

  const addMaterial = () => {
    setMaterials((prev) => [
      ...prev,
      { id: `${Date.now()}`, name: "", percentage: 0 },
    ]);
  };

  const removeMaterial = (id: string) => {
    setMaterials((prev) => prev.filter((material) => material.id !== id));
  };

  const getTotalPercentage = () => {
    return materials.reduce((sum, material) => sum + material.percentage, 0);
  };

  const totalPercentage = getTotalPercentage();
  const showTotalWarning =
    totalPercentage !== 100 && materials.some((m) => m.name.trim() !== "");

  return (
    <div className={styles["materials-field"]}>
      <div className={styles["materials-list"]}>
        {materials.map((material, index) => (
          <div key={material.id} className={styles["material-entry"]}>
            <div className={styles["input-group"]}>
              <input
                type="text"
                placeholder="e.g., Cotton, Wool"
                value={material.name}
                onChange={(e) =>
                  handleMaterialNameChange(material.id, e.target.value)
                }
                onBlur={onBlur}
                className={`${styles.input} ${error ? styles.error : ""}`}
              />
              <div className={styles["percentage-input"]}>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  value={material.percentage || ""}
                  onChange={(e) =>
                    handleMaterialPercentageChange(
                      material.id,
                      Number(e.target.value)
                    )
                  }
                  onBlur={onBlur}
                  className={`${styles.input} ${error ? styles.error : ""}`}
                />
                <span className={styles["percentage-symbol"]}>%</span>
              </div>
            </div>

            {materials.length > 1 && (
              <button
                type="button"
                onClick={() => removeMaterial(material.id)}
                className={styles["remove-button"]}
                aria-label="Remove material"
              >
                <IoCloseCircle size={24} />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addMaterial}
        className={styles["add-button"]}
      >
        <IoAddCircleOutline size={20} />
        Add Material
      </button>

      {showTotalWarning && (
        <div className={styles["total-info"]}>
          <span
            className={
              totalPercentage === 100 ? styles.success : styles.warning
            }
          >
            Total: {totalPercentage}%
            {totalPercentage !== 100 && " (should equal 100%)"}
          </span>
        </div>
      )}
    </div>
  );
}
