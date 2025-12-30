"use client";

import { FormFieldValue } from "@/types/form.types";
import { IPattern } from "@/types/pattern.types";
import { useState } from "react";
import Form from "../../(components)/form/form";
import { formFeaturedImageFields, formFieldstwo, formFields } from "../../(helpers)/pattern-form.helpers";
import styles from "./page.module.scss";


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

  return (
    <div className={`create-pattern-page wrapper`}>
      <Form
        contentWrapperClassName={styles.contentWrapper}
        onSubmit={(data) => console.log(data)}
        formData={formData as Record<string, FormFieldValue>}
        onFormDataChange={setFormData}
        fields={[
          {
            fields: formFields,
            title: "Patterns Details",
            className: styles["pattern-details"],
          },
          {
            fields: formFieldstwo,
            title: "Pattern Content",
            className: styles["pattern-content"],
          },
          {
            fields: formFeaturedImageFields,
            title: "Featured Image",
            className: styles["pattern-image"],
          },
          {
            fields: formFieldstwo,
            title: "",
            className: styles["pattern-abbreviation"],
          },
        ]}
        title="Patterns Details"
        subtitle="Fill in the details below to create a new pattern."
      />
    </div>
  );
}
