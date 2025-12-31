"use client";

import { FormFieldValue } from "@/types/form.types";
import { IPattern } from "@/types/pattern.types";
import { FormEvent, useState } from "react";
import Button from "../../(components)/button/button";
import FormContainer from "../../(components)/form/formContainer/formContainer";
import Hero from "../../(components)/hero/hero";
import { validateForm } from "../../(helpers)/field.helpers";
import {
  formFeaturedImageFields,
  formFields,
  formFieldstwo,
} from "../../(helpers)/pattern-form.helpers";
import styles from "./page.module.scss";
import { handleKeyDown } from "../../(helpers)/form.helpers";

export default function CreatePatternPage() {
  const [formData, setFormData] = useState<Partial<IPattern>>({
    title: "",
    subtitle: "",
    hookMinSize: 0,
    hookMaxSize: 0,
    yarns: [],
    materials: "",
    tipsAndInfo: "",
    image: "",
    abbreviation: {},
    userId: "",
    post: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (name: string, value: FormFieldValue) => {
    setFormData({ ...formData, [name]: value });
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

    const allFields = [
      ...formFeaturedImageFields,
      ...formFieldstwo,
      ...formFields,
    ];

    const { errors: validationErrors, isValid } = validateForm(
      allFields,
      formData as Record<string, FormFieldValue>
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
      // add submit
      console.log(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`create-pattern-page wrapper`}>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate className={styles["pattern-form"]}>
        <Hero
          title="Create New Pattern"
          subtitle="Fill in the details below to create a new pattern."
          actionSection={
            <Button
              type="submit"
              variant="primary"
            >
              Create Pattern
            </Button>
          }
        />
        <div className={styles["pattern-details-container"]}>
          <div className={styles["form-left-section"]}>
            <FormContainer
              className={styles["pattern-details"]}
              formTitle="Patterns Details"
              fields={formFields}
              formData={formData as Record<string, FormFieldValue>}
              touched={touched}
              errors={errors}
              onFieldChange={handleFieldChange}
            />
            <FormContainer
              className={styles["pattern-content"]}
              formTitle="Pattern Content"
              fields={formFieldstwo}
              formData={formData as Record<string, FormFieldValue>}
              touched={touched}
              errors={errors}
              onFieldChange={handleFieldChange}
            />
          </div>
          <div className={styles["form-right-section"]}>
            <FormContainer
              className={styles["pattern-image"]}
              formTitle="Featured Image"
              fields={formFeaturedImageFields}
              formData={formData as Record<string, FormFieldValue>}
              touched={touched}
              errors={errors}
              onFieldChange={handleFieldChange}
            />
            <FormContainer
              className={styles["pattern-abbreviation"]}
              fields={formFieldstwo}
              formData={formData as Record<string, FormFieldValue>}
              touched={touched}
              errors={errors}
              onFieldChange={handleFieldChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
