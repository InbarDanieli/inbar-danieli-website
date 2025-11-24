"use client";

import { useEffect, useState } from "react";
import YarnCard from "../(components)/yarnCard/yarnCard";
import { IYarnSchema } from "../(types)/yarn";
import styles from "./page.module.scss";
import EmptySection from "../(components)/emptySection/emptySection";
import Loader from "../(components)/loader/loader";

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

  if (loader) {
    // return <Loader />; // TODO - fix loader issue with hydration
  }
  if (error) {
    return <p>{error}</p>;
  }

  // TODO - issue with hydration
  // if (yarns.length <= 0 && !loader && !error) {
  //   return (
  //     <EmptySection
  //       title="No yarns found"
  //       description="Add your first yarn to start your yarn collection."
  //       icon={<PiYarn size={50} />}
  //       variant="yarn"
  //     />
  //   );
  // }

  // const devYarns = [
  //   {
  //     _id: '69242b4bd4c6058343665bcf',
  //     name: 'test',
  //     color: 'red',
  //     colorTag: 'color tag',
  //     company: 'company name',
  //     materials: {
  //       cotton: 50,
  //       wool: 50,
  //     },
  //     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATOCwoya_1g5dpZb9mQkw0f0vfpZQXAVutKLbWF2NQ_BK21d_DI2fBXhkjbUlemtjlev33B8DK4jhx2YzGIUeTHSvqB19WirKzCdTd6buEK5u2k9VQDlr806Uj0R2-CHiOoZNpc8m9d0dcWWXkT8dPAz75pJgrFvIO85pWOsXBEMdGtziJ8QWkKlwvvtoJOcCM0Af9QZ9lbIVoed4tlLOxAvQEa4YPl33gl-AL-puoIgVaYJv4EYIqhE62FAIt06ke_1ukiDOhIeBM',
  //     id: '69247689f329f6f150d0a65f'
  //   }
  // ]

  return (
    <div className={styles["yarns-section-wrapper"]}>
      {yarns.map((yarn, idx) => (
        <YarnCard key={yarn._id + idx} yarn={yarn} />
      ))}
    </div>
  );
}
