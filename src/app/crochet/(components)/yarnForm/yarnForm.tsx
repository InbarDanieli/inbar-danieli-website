"use client";

import { ToastContainer } from "react-toastify";
import Form from "../form/form";
import styles from "./yarnForm.module.scss";
import { FormFieldValue, IFormFieldConfig } from "@/types/form.types";
import { IoClose } from "react-icons/io5";
import actionButtonsStyles from "../actionButtons/actionButtons.module.scss";
import { useState } from "react";

export default function YarnForm({
  type,
  formFields,
  onSubmit,
  onClose,
}: {
  type: "add" | "edit";
  formFields: IFormFieldConfig[];
  onSubmit: (data: Record<string, FormFieldValue>) => void;
  onClose: () => void;
}) {
  const isAdded = type === "add";

  const loadingLabel = isAdded ? "Adding Yarn..." : "Updating Yarn...";
  const submitLabel = isAdded ? "Add Yarn" : "Update Yarn";
  const title = isAdded ? "Add New Yarn" : "Edit Yarn";
  const subtitle = isAdded
    ? "Fill in the details below to add a new yarn to your collection."
    : "Update the details below to modify your yarn.";

  const [formData, setFormData] = useState<Record<string, FormFieldValue>>(
    () => {
      const initialData: Record<string, FormFieldValue> = {};
      formFields.forEach((field) => {
        if (field.type === "materials") {
          initialData[field.name] = field.value || {};
        } else if (field.type === "file") {
          initialData[field.name] = field.value || null;
        } else {
          initialData[field.name] = field.value || "";
        }
      });
      return initialData;
    }
  );

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
          formData={formData}
          onFormDataChange={setFormData}
          loadingLabel={loadingLabel}
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
