import { IPatternPost, TPatternPostType } from "@/types/pattern.types";
import InputField from "../../inputField/inputField";
import SelectTypeButton from "../selectTypeButton/selectTypeButton";
import styles from "./patternFields.module.scss";
import { HiPencil } from "react-icons/hi";
import TextareaField from "../../textareaField/textareaField";
import MultiFileField from "../../multiFileField/multiFileField";

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

  function renderEditorType(type: TPatternPostType, field: IPatternPost) {
    switch (type) {
      case "title":
        return (
          <InputField
            placeholder="Section Header (e.g. Body)"
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
        );
      case "general-note":
        return (
          <TextareaField
            rows={4}
            placeholder={"Add a note here..."}
            className={styles["general-note-textarea"]}
            id={field.id}
            name={field.type}
            onChange={(e) =>
              handleChange(field.id, {
                ...field,
                content: e.target.value as string,
              })
            }
            value={field.content}
          />
        );
      case "separator":
        return <div className={styles["separator-line"]}></div>;

      case "space":
        return <div className={styles["space-line"]}></div>;

      case "images":
        return (
          <MultiFileField
            gridClassName={styles["images-grid"]}
            maxImages={3}
            id={field.id}
            name={field.type}
            value={field.images}
            onChange={(val) =>
              handleChange(field.id, { ...field, images: val })
            }
          />
        );

      case "row":
        return (
          <div className={styles["row-container"]}>
            <div className={styles["row-number-container"]}>
              <span className={styles["row-name"]}>R</span>
              <InputField
                className={styles["row-number"]}
                id={field.id}
                name={"row-number"}
                type="number"
                value={field.rowNumber || 0}
                onChange={(e) =>
                  handleChange(field.id, {
                    ...field,
                    rowNumber: Number(e.target.value),
                  })
                }
              />
            </div>
            <TextareaField
              rows={4}
              placeholder={"Instructions for this row..."}
              className={styles["row-instructions"]}
              id={field.id}
              name={"row-instructions"}
              onChange={(e) =>
                handleChange(field.id, {
                  ...field,
                  content: e.target.value as string,
                })
              }
              value={field.content}
            />
          </div>
        );

      default:
        return <div>Editor not found</div>;
    }
  }

  return (
    <div className={styles["pattern-fields-container"]}>
      {value.map((field) => (
        <div key={field.id} className={styles["pattern-field"]}>
          {renderEditorType(field.type, field)}
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
