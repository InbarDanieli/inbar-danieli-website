import { IPatternContentFieldProps } from "@/types/field.types";
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
          onChange={(newPost) => onChange([...value, newPost])}
        />
      </div>

      <PatternFields value={value} onChange={onChange} />
    </div>
  );
}
