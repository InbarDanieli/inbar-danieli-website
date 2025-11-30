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

const getYarns = async () => {
  try {
    const response = await fetch("/api/yarns");
    const data = await response.json();
    if (data.status !== 200) {
      throw new Error(data.message);
    }
    return data.data || [];
  } catch (error) {
    console.log({ error });
    throw (error as { message: string }).message || "Error fetching yarns";
  }
};

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
          <YarnCard key={yarn._id + idx} yarn={yarn} />
        ))}
      </div>
    </div>
  );
}
