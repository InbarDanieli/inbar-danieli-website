import { IPatternContentFieldProps } from "@/types/field.types";
import { FaPlus } from "react-icons/fa";
import { getDefaultPostPerType } from "../../(helpers)/post-default-field.helper";
import Button from "../button/button";
import styles from "./patternContent.module.scss";
import PatternFields from "./patternFields/patternFields";
import SelectTypeButton from "./selectTypeButton/selectTypeButton";

export default function PatternContentField({
  value,
  onChange,
  onBlur,
  formTitle,
}: IPatternContentFieldProps) {
  return (
    <div className={styles["content-field"]}>
      <div className={styles["content-header"]}>
        <h3>{formTitle}</h3>
        <SelectTypeButton
          pattern={value}
          onChange={(newPost) => onChange([...value, newPost])}
        />
      </div>

      <PatternFields value={value} onChange={onChange} />

      <Button
        className={styles["add-row-button"]}
        onclick={() =>
          onChange([
            ...value,
            getDefaultPostPerType({ pattern: value, type: "row" }),
          ])
        }
        variant="secondary"
      >
        <FaPlus size={10} /> Add Row
      </Button>
    </div>
  );
}
