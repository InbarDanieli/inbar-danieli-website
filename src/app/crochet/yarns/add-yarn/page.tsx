"use client";

import { useRouter } from "next/navigation";
import { IYarnSchema } from "@/types/yarn.types";

import Form from "../../(components)/form/form";
import { formFields } from "../../(helpers)/form.helpers";
import { FormFieldValue } from "@/types/form.types";
import styles from "./page.module.scss";
import { getAuthUser } from "../../(helpers)/auth.helpers";
import { toast, ToastContainer } from "react-toastify";
import { useAddYarn, useYarns } from "../../(hooks)/useYarns";

export default function AddYarn() {
  const router = useRouter();
  const user = getAuthUser();

  // Pre-fetch yarns to populate the cache before mutation
  useYarns();
  const addYarnMutation = useAddYarn();

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

      await addYarnMutation.mutateAsync(yarnData);
      toast.success("Yarn added successfully");

      // Redirect to yarns page on success
      router.push("/crochet/yarns");
    } catch (error) {
      console.error("Error adding yarn:", error);
      toast.error("Failed to add yarn. Please try again.");
    }
  };

  const handleBack = () => {
    router.push("/crochet/yarns");
  };

  return (
    <div className={`${styles["add-yarn-page"]} wrapper`}>
      <ToastContainer position="top-center" autoClose={2000} />
      <Form
        OnBack={handleBack}
        backLabel="Back to Yarns"
        title="Add New Yarn"
        subtitle="Fill in the details below to add a new yarn to your collection."
        fields={formFields}
        onSubmit={handleSubmit}
        submitLabel="Save Yarn"
      />
    </div>
  );
}
