"use client";

import { useEffect, useState } from "react";
import YarnCard from "../(components)/yarnCard/yarnCard";
import { IYarnSchema } from "../(types)/yarn.types";
import styles from "./page.module.scss";
import EmptySection from "../(components)/emptySection/emptySection";
import Loader from "../(components)/loader/loader";
import Title from "../(components)/title/title";
import { PiYarn } from "react-icons/pi";
import Link from "../(components)/link/link";
import { deleteYarn, getYarns } from "../(helpers)/yarn.helpers";
import { toast, ToastContainer } from "react-toastify";

export default function YarnSection() {
  const [yarns, setYarns] = useState<IYarnSchema[]>([]);
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    const fetchYarns = async () => {
      try {
        setLoader(true);
        const fetchedYarns = await getYarns();
        setYarns(fetchedYarns);
      } catch (error) {
        setError((error as string) || "Error fetching yarns");
      } finally {
        setLoader(false);
      }
    };

    fetchYarns();
  }, []);

  async function handleDeleteYarn(yarn: IYarnSchema) {
    const response = await deleteYarn(yarn);
    if (response.status !== 200) {
      toast.error("Error deleting yarn, please try again");
      return;
    }
    setYarns(yarns.filter((y) => y._id !== yarn._id));
    toast.success("Yarn deleted successfully");
  }

  function renderBody() {
    if (loader) {
      return <Loader />;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (yarns.length <= 0 && !loader && !error) {
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

        <Link variant="primary" href="/crochet/yarns/add-yarn">
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
