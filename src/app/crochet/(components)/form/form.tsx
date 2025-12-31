"use client";

import { FormFieldValue, IFormProps } from "@/types/form.types";
import { FormEvent, useState } from "react";
import { validateForm } from "../../(helpers)/field.helpers";
import ActionButtons from "../actionButtons/actionButtons";
import actionsStyles from "../actionButtons/actionButtons.module.scss";
import Button from "../button/button";
import Title from "../title/title";
import styles from "./form.module.scss";
import FormContainer from "./formContainer/formContainer";
import { handleKeyDown } from "../../(helpers)/form.helpers";

export default function Form({
  title,
  subtitle,
  fields,
  onSubmit,
  onCancel,
  onFormDataChange,
  formData,
  OnBack,
  backLabel = "Back",
  submitLabel = "Save",
  cancelLabel = "Cancel",
  variant = "default",
  actionButtonsClassName,
  loadingLabel = "Submitting...",
  contentWrapperClassName,
}: IFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (name: string, value: FormFieldValue) => {
    onFormDataChange?.({ ...formData, [name]: value });
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

    const allFields = fields.flatMap((field) => field.fields);

    const { errors: validationErrors, isValid } = validateForm(
      allFields,
      formData
    );

    if (!isValid) {
      const newTouched: Record<string, boolean> = {};
      allFields.forEach((field) => {
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
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate>
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

        <div className={contentWrapperClassName}>
          {fields.map((field, idx) => (
            <FormContainer
              className={field.className}
              formTitle={field.title}
              fields={field.fields}
              formData={formData}
              touched={touched}
              errors={errors}
              onFieldChange={handleFieldChange}
              variant={variant}
              key={(field?.title || "") + idx}
            />
          ))}
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
