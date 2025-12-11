import { ToastContainer } from "react-toastify";
import Form from "../form/form";
import styles from "./yarnForm.module.scss";
import { FormFieldValue, IFormFieldConfig } from "@/types/form.types";
import { IoClose } from "react-icons/io5";
import actionButtonsStyles from "../actionButtons/actionButtons.module.scss";

export default function YarnForm({
  type,
  formFields,
  onSubmit,
  onClose,
  submitLabel,
}: {
  type: "add" | "edit";
  formFields: IFormFieldConfig[];
  onSubmit: (data: Record<string, FormFieldValue>) => void;
  onClose: () => void;
  submitLabel: string;
}) {
  const title = type === "add" ? "Add New Yarn" : "Edit Yarn";
  const subtitle =
    type === "add"
      ? "Fill in the details below to add a new yarn to your collection."
      : "Update the details below to modify your yarn.";

  return (
    <>
      <button
        className={`${actionButtonsStyles.closeButton} ${styles.closeButton}`}
        onClick={onClose}
        aria-label="Close popup"
      >
        <IoClose size="2em" />
      </button>
      <div className={`${styles["yarn-form"]} wrapper`}>
        <ToastContainer position="top-center" autoClose={2000} />
        <Form
          actionButtonsClassName={styles.actionButtons}
          variant="popup"
          title={title}
          subtitle={subtitle}
          fields={formFields}
          onSubmit={onSubmit}
          submitLabel={submitLabel}
        />
      </div>
    </>
  );
}
