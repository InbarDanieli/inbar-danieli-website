import { getDefaultPostPerType } from "@/app/crochet/(helpers)/post-default-field.helper";
import { IPatternPost, TPatternPostType } from "@/types/pattern.types";
import { IoMdAddCircle } from "react-icons/io";
import BlockSelect from "../../blockSelect/blockSelect";
import { blockTypes } from "./blockType";
import styles from "./selectTypeButton.module.scss";
import { useState } from "react";
import Popup from "../../popup/popup";
import ActionButtons from "../../actionButtons/actionButtons";

export default function SelectTypeButton({
  pattern,
  post,
  onChange,
  className,
  icon = <IoMdAddCircle size={18} />,
  label = "Add Block",
}: {
  pattern: IPatternPost[];
  post?: IPatternPost;
  onChange: (value: IPatternPost) => void;
  className?: string;
  icon?: React.ReactNode;
  label?: string;
}) {
  const defaultType = post?.type || blockTypes[0].type;
  const [blockSelectIsOpen, setBlockSelectIsOpen] = useState(false);
  const [displayValidatePopup, setDisplayValidatePopup] = useState(false);
  const [validateSelectedType, setValidateSelectedType] =
    useState<TPatternPostType>(defaultType);

  function resetValidatePopup() {
    setDisplayValidatePopup(false);
    setBlockSelectIsOpen(false);
    setValidateSelectedType(defaultType);
  }

  function handleValidateUpdateType(
    e: React.MouseEvent<HTMLDivElement>,
    type: TPatternPostType
  ) {
    if (post?.content) {
      setDisplayValidatePopup(true);
      setValidateSelectedType(type);
      return;
    }
    onChange(getDefaultPostPerType({pattern, type: type as TPatternPostType}));
    resetValidatePopup();
  }

  return (
    <>
      {displayValidatePopup && (
        <Popup
          showHeader={false}
          isOpen={displayValidatePopup}
          onClose={() => setDisplayValidatePopup(false)}
          size="medium"
        >
          <div className={styles["validate-popup-content"]}>
            Are you sure you want to update this block?
            <span>
              Note that this will overwrite the current block with the updated
              type.
            </span>
          </div>
          <ActionButtons
            submitLabel="Update"
            cancelLabel="Cancel"
            isLoading={false}
            onCancel={() => {
              resetValidatePopup();
            }}
            onSubmit={() => {
              onChange(
                getDefaultPostPerType({pattern, type: validateSelectedType as TPatternPostType})
              );
              resetValidatePopup();
            }}
          />
        </Popup>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setBlockSelectIsOpen(true);
        }}
        className={`${styles["select-type-button"]} ${className}`}
      >
        {icon}
        {label}
        {blockSelectIsOpen && (
          <BlockSelect
            onTypeSelect={(e, type) => {
              handleValidateUpdateType(e, type);
            }}
            selectedType={post?.type}
            onClose={() => setBlockSelectIsOpen(false)}
            onSelect={(e, type) => {
              e.stopPropagation();
              onChange(getDefaultPostPerType({pattern, type: type as TPatternPostType}));
              setBlockSelectIsOpen(false);
            }}
            blockTypes={blockTypes}
          />
        )}
      </button>
    </>
  );
}
