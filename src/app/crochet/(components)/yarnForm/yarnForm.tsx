import { ToastContainer } from "react-toastify";
import Form from "../form/form";
import styles from "./yarnForm.module.scss";
import { FormFieldValue, IFormFieldConfig } from "@/types/form.types";

export default function YarnForm({
  type,
  formFields,
  onSubmit,
  submitLabel,
}: {
  type: "add" | "edit";
  formFields: IFormFieldConfig[];
  onSubmit: (data: Record<string, FormFieldValue>) => void;
  submitLabel: string;
}) {
  const title = type === "add" ? "Add New Yarn" : "Edit Yarn";
  const subtitle =
    type === "add"
      ? "Fill in the details below to add a new yarn to your collection."
      : "Update the details below to modify your yarn.";

  return (
    <div className={`${styles["add-yarn-page"]} wrapper`}>
      <ToastContainer position="top-center" autoClose={2000} />
      <Form
        variant="popup"
        title={title}
        subtitle={subtitle}
        fields={formFields}
        onSubmit={onSubmit}
        submitLabel={submitLabel}
      />
    </div>
  );
}
