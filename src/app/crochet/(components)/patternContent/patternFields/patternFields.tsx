import { IPatternPost } from "@/types/pattern.types";
import InputField from "../../inputField/inputField";
import SelectTypeButton from "../selectTypeButton/selectTypeButton";
import styles from "./patternFields.module.scss";
import { HiPencil } from "react-icons/hi";

export default function PatternFields({
  value,
  onChange,
}: {
  value: IPatternPost[];
  onChange: (value: IPatternPost[]) => void;
}) {
  function handleChange(id: string, updatedField: IPatternPost) {
    const updatedValue = value.map((field) =>
      field.id === id ? updatedField : field
    );
    onChange(updatedValue);
  }

  return (
    <div>
      {value.map((field) => (
        <div key={field.id} className={styles["pattern-field"]}>
          <InputField
            className={styles["pattern-field-input"]}
            id={field.id}
            name={field.type}
            value={field.content}
            onChange={(e) =>
              handleChange(field.id, {
                ...field,
                content: e.target.value as string,
              })
            }
          />
          <SelectTypeButton
            className={`${styles[field.type]} ${styles["edit-button"]}`}
            icon={<HiPencil size={16} />}
            label={field.type}
            onChange={(newPost) => handleChange(field.id, newPost)}
          />
        </div>
      ))}
    </div>
  );
}
