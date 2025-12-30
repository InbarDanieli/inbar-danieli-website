import { FormFieldValue, IFormContainerProps } from "@/types/form.types";
import globalStyles from "../../../(styles)/globals.module.scss";
import Field from "../../field/field";
import styles from "../form.module.scss";

export default function FormContainer({
  formTitle,
  fields,
  formData,
  touched,
  errors,
  onFieldChange,
  variant = "default",
  className,
}: IFormContainerProps) {
  return (
    <div
      className={`${globalStyles["form-content"]} ${styles["form-content"]} ${styles[variant]} ${className}`}
    >
      <div className={globalStyles["fields-grid"]}>
        {formTitle && <h3 className={styles["form-title"]}>{formTitle}</h3>}
        {fields.map((field) => (
          <div
            key={field.name}
            className={`${globalStyles["field-wrapper"]} ${
              field.gridColumn === "full" ? globalStyles.full : ""
            }`}
          >
            <Field
              {...field}
              value={formData[field.name] as FormFieldValue}
              error={touched[field.name] ? errors[field.name] : undefined}
              onChange={(value: FormFieldValue) =>
                onFieldChange(field.name, value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
