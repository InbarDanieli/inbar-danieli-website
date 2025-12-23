"use client";

import { FormFieldValue, IFormProps } from "@/types/form.types";
import { IYarnImage } from "@/types/yarn.types";
import { FormEvent, useState } from "react";
import { validateForm } from "../../(helpers)/field.helpers";
import globalStyles from "../../(styles)/globals.module.scss";
import ActionButtons from "../actionButtons/actionButtons";
import actionsStyles from "../actionButtons/actionButtons.module.scss";
import Button from "../button/button";
import Field from "../field/field";
import Title from "../title/title";
import styles from "./form.module.scss";

export default function Form({
  title,
  subtitle,
  fields,
  onSubmit,
  onCancel,
  OnBack,
  backLabel = "Back",
  submitLabel = "Save",
  cancelLabel = "Cancel",
  variant = "default",
  actionButtonsClassName,
  loadingLabel = "Submitting...",
}: IFormProps) {
  const [formData, setFormData] = useState<Record<string, FormFieldValue>>(
    () => {
      const initialData: Record<string, FormFieldValue> = {};
      fields.forEach((field) => {
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (name: string, value: FormFieldValue) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { errors: validationErrors, isValid } = validateForm(
      fields,
      formData
    );

    if (!isValid) {
      const newTouched: Record<string, boolean> = {};
      fields.forEach((field) => {
        newTouched[field.name] = true;
      });
      setTouched(newTouched);
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit?.(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.form}>
      {OnBack && (
        <Button onclick={OnBack} variant="back">
          {backLabel}
        </Button>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className={`${styles.header} ${styles[variant]}`}>
          <Title
            content={title || ""}
            subtitle={subtitle || ""}
            titleType="h2"
            variant="secondary"
          />
          <ActionButtons
            loadingLabel={loadingLabel}
            cancelLabel={cancelLabel}
            submitLabel={submitLabel}
            isLoading={isSubmitting}
            onCancel={onCancel}
            className={`${
              variant !== "popup" ? actionsStyles.desktop : undefined
            } ${actionButtonsClassName}`}
          />
        </div>

        <div
          className={`${globalStyles["form-content"]} ${styles["form-content"]} ${styles[variant]}`}
        >
          <div className={globalStyles["fields-grid"]}>
            {fields.map((field) => (
              <div
                key={field.name}
                className={`${globalStyles["field-wrapper"]} ${
                  field.gridColumn === "full" ? globalStyles.full : ""
                }`}
              >
                <Field
                  {...field}
                  value={
                    formData[field.name] as
                      | string
                      | number
                      | Record<string, number>
                      | IYarnImage
                      | null
                  }
                  error={touched[field.name] ? errors[field.name] : undefined}
                  onChange={(value: FormFieldValue) =>
                    handleFieldChange(field.name, value)
                  }
                />
              </div>
            ))}
          </div>
        </div>
        {variant !== "popup" && (
          <ActionButtons
            cancelLabel={cancelLabel}
            submitLabel={submitLabel}
            isLoading={isSubmitting}
            onCancel={onCancel}
            className={`${actionsStyles.mobile} ${actionButtonsClassName}`}
          />
        )}
      </form>
    </div>
  );
}
