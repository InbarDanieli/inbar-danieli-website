"use client";

import { useRouter } from "next/navigation";
import { IYarnSchema } from "../../(types)/yarn.types";

import Form from "../../(components)/form/form";
import { AddYarnToDB, formFields } from "../../(helpers)/form.helpers";
import { FormFieldValue } from "../../(types)/form.types";
import styles from "./page.module.scss";
import { getAuthUser } from "../../(helpers)/auth.helpers";
import { toast, ToastContainer } from "react-toastify";

export default function AddYarn() {
  const router = useRouter();
  const user = getAuthUser();

  const handleSubmit = async (data: Record<string, FormFieldValue>) => {
    try {
      if (!user?.userId) {
        throw new Error("User not authenticated");
      }
      // Prepare yarn data according to schema
      const yarnData: Omit<IYarnSchema, "_id"> = {
        name: (data.name as string) || "",
        color: (data.color as string) || "",
        colorTag: (data.colorTag as string) || "",
        company: (data.company as string) || "",
        materials: (data.materials as Record<string, number>) || {},
        image: (data.image as string) || "", // TODO: Handle file upload properly
        userId: user?.userId || "",
      };

      await AddYarnToDB(yarnData);

      // Redirect to yarns page on success
      router.push("/crochet/yarns");
    } catch (error) {
      console.error("Error adding yarn:", error);
      toast.error("Failed to add yarn. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push("/crochet/yarns");
  };

  return (
    <div className={`${styles["add-yarn-page"]} wrapper`}>
      <ToastContainer position="top-center" autoClose={2000} />
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
