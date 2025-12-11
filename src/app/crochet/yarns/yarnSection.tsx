"use client";

import YarnCard from "../(components)/yarnCard/yarnCard";
import { IYarnSchema } from "@/types/yarn.types";
import styles from "./page.module.scss";
import EmptySection from "../(components)/emptySection/emptySection";
import Loader from "../(components)/loaders/loader/loader";
import Title from "../(components)/title/title";
import { PiYarn } from "react-icons/pi";
import Link from "../(components)/link/link";
import { useYarns, useDeleteYarn } from "../(hooks)/useYarns";
import { toast, ToastContainer } from "react-toastify";

export default function YarnSection() {
  const { data, isPending, error } = useYarns();

  const yarns = data?.data || [];
  const deleteYarnMutation = useDeleteYarn();

  async function handleDeleteYarn(yarn: IYarnSchema) {
    try {
      await deleteYarnMutation.mutateAsync(yarn._id);
      toast.success("Yarn deleted successfully");
    } catch {
      toast.error("Error deleting yarn, please try again");
    }
  }

  function renderBody() {
    if (isPending) {
      return <Loader />;
    }

    if (error) {
      return <p>{error.message}</p>;
    }

    if (yarns.length <= 0) {
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

  return (
    <div className={`${styles["yarns-page"]} wrapper`}>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className={styles.hero}>
        <Title
          content={`My Yarn Stash`}
          subtitle="Your personal collection of yarns"
        />

        <Link className={styles["add-yarn-link"]} variant="primary" href="/crochet/yarns/add-yarn">
          Add Yarn
        </Link>
      </div>
      {renderBody()}
      <div className={styles["yarns-section-wrapper"]}>
        {yarns.map((yarn, idx) => (
          <YarnCard
            onDelete={async (yarn) => {
              handleDeleteYarn(yarn);
            }}
            key={yarn._id + idx}
            yarn={yarn}
          />
        ))}
      </div>
    </div>
  );
}
