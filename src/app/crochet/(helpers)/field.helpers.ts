import { IFormFieldConfig, FormFieldValue } from "@/types/form.types";

export const validateField = (
  field: IFormFieldConfig,
  value: FormFieldValue
): string | undefined => {
  if (!field) return undefined;

  // Check required fields
  if (field.required) {
    if (field.type === "materials") {
      const materials = value as Record<string, number>;
      if (!materials || Object.keys(materials).length === 0) {
        return `At least one material is required`;
      }
    } else if (!value || value === "") {
      return `Field is required`;
    }
  }

  // Custom validation
  if (field.validate) {
    return field.validate(value);
  }

  return undefined;
};

export const validateForm = (
  fields: IFormFieldConfig[],
  formData: Record<string, FormFieldValue>
): {
  errors: Record<string, string>;
  isValid: boolean;
} => {
  const errors: Record<string, string> = {};

  fields.forEach((field) => {
    const error = validateField(field, formData[field.name]);
    if (error) {
      errors[field.name] = error;
    }
  });

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

