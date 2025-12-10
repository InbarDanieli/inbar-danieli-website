"use client";

import { FormFieldValue, IFormProps } from "@/types/form.types";
import { FormEvent, useState } from "react";
import { validateForm } from "../../(helpers)/field.helpers";
import globalStyles from "../../(styles)/globals.module.scss";
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
}: IFormProps) {
  const [formData, setFormData] = useState<Record<string, FormFieldValue>>(
    () => {
      const initialData: Record<string, FormFieldValue> = {};
      fields.forEach((field) => {
        if (field.type === "materials") {
          initialData[field.name] = field.value || {};
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
      await onSubmit(formData);
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
        <div className={styles.header}>
          <Title
            content={title || ""}
            subtitle={subtitle || ""}
            titleType="h2"
            variant="secondary"
          />

          <div className={styles.actions}>
            {onCancel && (
              <Button
                variant="secondary"
                onclick={onCancel}
                disabled={isSubmitting}
              >
                {cancelLabel}
              </Button>
            )}
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : submitLabel}
            </Button>
          </div>
        </div>

        <div className={globalStyles["form-content"]}>
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
                    field.type === "file"
                      ? undefined
                      : field.type === "materials"
                      ? (formData[field.name] as Record<string, number>)
                      : (formData[field.name] as string | number | undefined)
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
      </form>
    </div>
  );
}
