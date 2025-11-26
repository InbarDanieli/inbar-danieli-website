"use client";

import { useRouter } from "next/navigation";
import { IYarnSchema } from "../../(types)/yarn";

import Form from "../../(components)/form/form";
import { AddYarnToDB, formFields } from "../../(helpers)/form.helpers";
import { FormFieldValue } from "../../(types)/form";
import styles from "./page.module.scss";

export default function AddYarn() {
  const router = useRouter();

  const handleSubmit = async (data: Record<string, FormFieldValue>) => {
    try {
      // Prepare yarn data according to schema
      const yarnData: Omit<IYarnSchema, "_id"> = {
        name: (data.name as string) || "",
        color: (data.color as string) || "",
        colorTag: (data.colorTag as string) || "",
        company: (data.company as string) || "",
        materials: (data.materials as Record<string, number>) || {},
        image: (data.image as string) || "", // TODO: Handle file upload properly
      };

      await AddYarnToDB(yarnData);

      // Redirect to yarns page on success
      router.push("/crochet/yarns");
    } catch (error) {
      console.error("Error adding yarn:", error);
      alert("Failed to add yarn. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push("/crochet/yarns");
  };

  return (
    <div className={`${styles["add-yarn-page"]} wrapper`}>
      <Form
        title="Add New Yarn"
        subtitle="Fill in the details below to add a new yarn to your collection."
        fields={formFields}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Save Yarn"
        cancelLabel="Cancel"
      />
    </div>
  );
}
