"use client";

import { FormFieldValue, IFormFieldConfig } from "@/types/form.types";
import { IYarnSchema } from "@/types/yarn.types";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import Form from "../../../(components)/form/form";
import Loader from "../../../(components)/loaders/loader/loader";
import { getAuthUser } from "../../../(helpers)/auth.helpers";
import { formFields } from "../../../(helpers)/form.helpers";
import { useUpdateYarn, useYarn } from "../../../(hooks)/useYarns";
import styles from "./page.module.scss";

export default function EditYarn() {
  const router = useRouter();
  const user = getAuthUser();

  const params = useParams<{ yarnId: string }>();
  const { yarnId } = params;

  // Gets yarn directly from cached yarns list - no separate API call!
  const { data: yarn, isPending, error, isNotFound } = useYarn(yarnId);
  const updateYarnMutation = useUpdateYarn();

  // Memoize form fields with yarn values
  const formFieldsValues: IFormFieldConfig[] = useMemo(() => {
    if (!yarn) return formFields;
    return formFields.map((field) => ({
      ...field,
      value: yarn[field.name as keyof IYarnSchema] || "",
    }));
  }, [yarn]);

  async function handleSubmit(data: Record<string, FormFieldValue>) {
    try {
      if (!user?.userId) {
        throw new Error("User not authenticated");
      }
      // Prepare yarn data according to schema
      const yarnData: Omit<IYarnSchema, "_id" | "userId"> = {
        name: (data.name as string) || "",
        color: (data.color as string) || "",
        colorTag: (data.colorTag as string) || "",
        company: (data.company as string) || "",
        materials: (data.materials as Record<string, number>) || {},
        image: (data.image as string) || "",
      };

      await updateYarnMutation.mutateAsync({ yarnId, yarnData });
      toast.success("Yarn updated successfully");
      // Redirect to yarns page on success
      router.push("/crochet/yarns");
    } catch (error) {
      console.error("Error updating yarn:", error);
      toast.error("Failed to update yarn. Please try again.");
    }
  }

  const handleBack = () => {
    router.push("/crochet/yarns");
  };

  // Show loading only while yarns list is being fetched
  if (isPending) {
    return (
      <div className={`${styles["add-yarn-page"]} wrapper`}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles["add-yarn-page"]} wrapper`}>
        <p>Error loading yarn: {error.message}</p>
      </div>
    );
  }

  if (isNotFound) {
    return (
      <div className={`${styles["add-yarn-page"]} wrapper`}>
        <p>Yarn not found</p>
      </div>
    );
  }

  return (
    <div className={`${styles["add-yarn-page"]} wrapper`}>
      <ToastContainer position="top-center" autoClose={2000} />
      <Form
        title="Edit Yarn"
        subtitle="Update the details below to modify your yarn."
        fields={formFieldsValues}
        onSubmit={handleSubmit}
        OnBack={handleBack}
        backLabel="Back to Yarns"
        submitLabel="Update Yarn"
      />
    </div>
  );
}
