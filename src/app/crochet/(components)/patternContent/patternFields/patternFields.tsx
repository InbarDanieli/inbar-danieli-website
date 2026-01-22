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
  function handleChange(id: string, updatedPost: IPatternPost) {
    const updatedValue = value.map((post) =>
      post.id === id ? updatedPost : post
    );
    onChange(updatedValue);
  }

  function renderEditorType(type: TPatternPostType, post: IPatternPost) {
    switch (type) {
      case "title":
        return (
          <InputField
            placeholder="Section Header (e.g. Body)"
            className={styles["pattern-field-input"]}
            id={post.id}
            name={post.type}
            value={post.content}
            onChange={(e) =>
              handleChange(post.id, {
                ...post,
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
            id={post.id}
            name={post.type}
            onChange={(e) =>
              handleChange(post.id, {
                ...post,
                content: e.target.value as string,
              })
            }
            value={post.content}
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
            id={post.id}
            name={post.type}
            value={post.images}
            onChange={(val) => handleChange(post.id, { ...post, images: val })}
          />
        );

      case "row":
        return (
          <div className={styles["row-container"]}>
            <div className={styles["row-number-container"]}>
              <span className={styles["row-name"]}>R</span>
              <InputField
                className={styles["row-number"]}
                id={post.id}
                name={"row-number"}
                type="number"
                value={post.rowNumber || 0}
                onChange={(e) =>
                  handleChange(post.id, {
                    ...post,
                    rowNumber: Number(e.target.value),
                  })
                }
              />
            </div>
            <TextareaField
              rows={4}
              placeholder={"Instructions for this row..."}
              className={styles["row-instructions"]}
              id={post.id}
              name={"row-instructions"}
              onChange={(e) =>
                handleChange(post.id, {
                  ...post,
                  content: e.target.value as string,
                })
              }
              value={post.content}
            />
          </div>
        );

      default:
        return <div>Editor not found</div>;
    }
  }

  return (
    <div className={styles["pattern-fields-container"]}>
      {value.map((post) => (
        <div key={post.id} className={styles["pattern-field"]}>
          {renderEditorType(post.type, post)}
          <SelectTypeButton
            pattern={value}
            post={post}
            className={`${styles[post.type]} ${styles["edit-button"]}`}
            icon={<HiPencil size={16} />}
            label={post.type}
            onChange={(newPost) => handleChange(post.id, newPost)}
          />
        </div>
      ))}
    </div>
  );
}
