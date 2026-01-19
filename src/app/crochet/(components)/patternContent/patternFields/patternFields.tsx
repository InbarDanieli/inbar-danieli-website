import { IPatternPost } from "@/types/pattern.types";
import InputField from "../../inputField/inputField";
import SelectTypeButton from "../selectTypeButton/selectTypeButton";
import styles from "./patternFields.module.scss";

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
            onChange={(newPost) => handleChange(field.id, newPost)}
          />
        </div>
      ))}
    </div>
  );
}
