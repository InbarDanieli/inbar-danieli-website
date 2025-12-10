"use client";

// import { useParams, useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { IYarnSchema } from "@/types/yarn.types";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Form from "../../../(components)/form/form";
import { getAuthUser } from "../../../(helpers)/auth.helpers";
import { formFields, UpdateYarnInDB } from "../../../(helpers)/form.helpers";
import { FormFieldValue, IFormFieldConfig } from "@/types/form.types";
import styles from "./page.module.scss";
import { getYarn } from "../../../(helpers)/yarn.helpers"; 

export default function EditYarn() {
  const router = useRouter();
  const user = getAuthUser();

  const params = useParams<{ yarnId: string }>();
  const { yarnId } = params;
  const [loading, setLoading] = useState(true);
  const [formFieldsValues, setFormFieldsValues] =
    useState<IFormFieldConfig[]>(formFields);

  useEffect(() => {
    const fetchYarn = async () => {
      try {
        const yarn = await getYarn(yarnId);
        if (!yarn) {
          throw new Error("Yarn not found");
        }
        setFormFieldsValues(
          formFields.map((field) => {
            return {
              ...field,
              value: yarn?.[field.name as keyof IYarnSchema] || "",
            };
          })
        );
      } catch (error) {
        console.error("Error fetching yarn:", error);
        setLoading(false);
        toast.error("Error fetching yarn, please try again");
      } finally {
        setLoading(false);
      }
    };
    fetchYarn();
  }, [yarnId]);

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
        image: (data.image as string) || "", // TODO: Handle file upload properly
      };

      await UpdateYarnInDB(yarnId, yarnData);
      toast.success("Yarn updated successfully");
      // Redirect to yarns page on success
      router.push("/crochet/yarns");
    } catch (error) {
      console.error("Error adding yarn:", error);
      toast.error("Failed to add yarn. Please try again.");
    }
  }

  const handleCancel = () => {
    router.push("/crochet/yarns");
  };

  return (
    <div className={`${styles["add-yarn-page"]} wrapper`}>
      <ToastContainer position="top-center" autoClose={2000} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Form
          title="Add New Yarn"
          subtitle="Fill in the details below to add a new yarn to your collection."
          fields={formFieldsValues}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel="Update Yarn"
          cancelLabel="Cancel"
        />
      )}
    </div>
  );
}
