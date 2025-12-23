"use client";

import { FormFieldValue, IFormFieldConfig } from "@/types/form.types";
import { IYarnImage, IYarnSchema } from "@/types/yarn.types";
import { useMemo, useState } from "react";
import { PiYarn } from "react-icons/pi";
import { toast, ToastContainer } from "react-toastify";
import EmptySection from "../(components)/emptySection/emptySection";
import Hero from "../(components)/hero/hero";
import Loader from "../(components)/loaders/loader/loader";
import LoadMore from "../(components)/loadMore/loadMore";
import Popup from "../(components)/popup/popup";
import YarnCard from "../(components)/yarnCard/yarnCard";
import YarnForm from "../(components)/yarnForm/yarnForm";
import { getAuthUser } from "../(helpers)/auth.helpers";
import { formFields } from "../(helpers)/form.helpers";
import {
  useAddYarn,
  useDeleteYarn,
  useUpdateYarn,
  useUpdateYarnsWithPagination,
  useYarns,
} from "../(hooks)/useYarns";
import styles from "./page.module.scss";

export default function YarnsPage() {
  const { data, isPending, error } = useYarns();
  const user = getAuthUser();
  const {
    mutateAsync: updateYarnsWithPaginationMutation,
    isPending: isUpdatingYarns,
  } = useUpdateYarnsWithPagination();
  const addYarnMutation = useAddYarn();
  const updateYarnMutation = useUpdateYarn();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedYarn, setSelectedYarn] = useState<IYarnSchema | null>(null);

  const deleteYarnMutation = useDeleteYarn();

  async function handleDeleteYarn(yarn: IYarnSchema) {
    try {
      await deleteYarnMutation.mutateAsync(yarn._id);
      toast.success("Yarn deleted successfully");
    } catch {
      toast.error("Error deleting yarn, please try again");
    }
  }

  function closePopup() {
    setIsPopupOpen(false);
    setSelectedYarn(null);
  }

  function renderBody() {
    if (isPending) {
      return <Loader />;
    }

    if (error) {
      return <p>{error.message}</p>;
    }

    if (data?.data.length <= 0) {
      return (
        <EmptySection
          title="No yarns found"
          description="Add your first yarn to start your yarn collection."
          icon={<PiYarn size={50} />}
          variant="yarn"
        />
      );
    }
  }

  const handleAddSubmit = async (data: Record<string, FormFieldValue>) => {
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
        image: (data.image as IYarnImage) || null,
        userId: user?.userId || "",
      };

      await addYarnMutation.mutateAsync(yarnData);
      toast.success("Yarn added successfully");

      closePopup();
    } catch (error) {
      console.error("Error adding yarn:", error);
      toast.error("Failed to add yarn. Please try again.");
    }
  };

  async function handleLoadMore(page: number) {
    try {
      await updateYarnsWithPaginationMutation({
        page,
      });
    } catch (error) {
      console.error("Error loading more yarns:", error);
      toast.error("Failed to load more yarns. Please try again.");
    }
  }

  async function handleEditSubmit(
    data: Record<string, FormFieldValue>,
    yarnId: string
  ) {
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
        image: (data.image as IYarnImage) || null,
      };

      await updateYarnMutation.mutateAsync({ yarnId, yarnData });
      toast.success("Yarn updated successfully");
      closePopup();
    } catch (error) {
      console.error("Error updating yarn:", error);
      toast.error("Failed to update yarn. Please try again.");
    }
  }

  // Memoize form fields with yarn values
  const formFieldsValues: IFormFieldConfig[] = useMemo(() => {
    if (!selectedYarn) return formFields;
    return formFields.map((field) => ({
      ...field,
      value: selectedYarn[field.name as keyof IYarnSchema] || "",
    }));
  }, [selectedYarn]);

  return (
    <div className={`${styles["yarns-page"]} wrapper`}>
      <Popup
        popupContentStyles={{ padding: 0 }}
        showHeader={false}
        isOpen={isPopupOpen}
        onClose={closePopup}
        size="large"
      >
        <YarnForm
          onClose={closePopup}
          type={selectedYarn ? "edit" : "add"}
          formFields={selectedYarn ? formFieldsValues : formFields}
          onSubmit={
            selectedYarn
              ? (data: Record<string, FormFieldValue>) =>
                  handleEditSubmit(data, selectedYarn._id)
              : handleAddSubmit
          }
        />
      </Popup>

      <ToastContainer position="top-center" autoClose={2000} />

      <Hero
        loadingLabel="Add yarn"
        isLoading={isPending || addYarnMutation.isPending || updateYarnMutation.isPending}
        title="My Yarn Stash"
        subtitle="Your personal collection of yarns"
        primaryButtonLabel="Add Yarn"
        onPrimaryClick={() => setIsPopupOpen(true)}
      />

      {renderBody()}
      <div className={styles["yarns-section-wrapper"]}>
        {data?.data.map((yarn, idx) => (
          <YarnCard
            onDelete={async (yarn) => {
              handleDeleteYarn(yarn);
            }}
            onYarnEdit={(yarn) => {
              setSelectedYarn(yarn);
              setIsPopupOpen(true);
            }}
            key={yarn._id + idx}
            yarn={yarn}
          />
        ))}
      </div>

      <LoadMore
        loading={isUpdatingYarns}
        nextPage={data?.nextPage || null}
        onPageChange={handleLoadMore}
        className={styles["load-more"]}
      />
    </div>
  );
}
