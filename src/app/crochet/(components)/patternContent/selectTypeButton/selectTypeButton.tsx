import { getDefaultPostPerType } from "@/app/crochet/(helpers)/post-default-field.helper";
import { IPatternPost, TPatternPostType } from "@/types/pattern.types";
import { IoMdAddCircle } from "react-icons/io";
import BlockSelect from "../../blockSelect/blockSelect";
import { blockTypes } from "./blockType";
import styles from "./selectTypeButton.module.scss";

export default function SelectTypeButton({
  blockSelectIsOpen,
  setBlockSelectIsOpen,
  onChange,
}: {
  blockSelectIsOpen: boolean;
  setBlockSelectIsOpen: (isOpen: boolean) => void;
  onChange: (value: IPatternPost) => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setBlockSelectIsOpen(true);
      }}
      className={styles["add-button"]}
    >
      <IoMdAddCircle size={18} />
      Add Block
      {blockSelectIsOpen && (
        <BlockSelect
          onClose={() => setBlockSelectIsOpen(false)}
          onSelect={(e, type) => {
            e.stopPropagation();
            onChange(getDefaultPostPerType(type as TPatternPostType));
            setBlockSelectIsOpen(false);
          }}
          blockTypes={blockTypes}
        />
      )}
    </button>
  );
}
