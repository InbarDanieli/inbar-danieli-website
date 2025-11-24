"use client";

import { IYarnSchema } from "../../(types)/yarn";
import styles from "./page.module.scss";

async function AddYarnToDB(yarn: Omit<IYarnSchema, "_id">) {
  try {
    const response = await fetch("/api/yarns", {
      method: "POST",
      body: JSON.stringify(yarn),
    });
    const data = await response.json();
    if (data.status !== 200) {
      throw new Error(data.message);
    }
    window.location.href = "/crochet/yarns";
    return data.data;
  } catch (error) {
    console.log({ error });
    throw (error as { message: string }).message || "Error adding yarn to DB";
  }
}

const devYarns = {
  name: "test",
  color: "red",
  colorTag: "color tag",
  company: "company name",
  materials: {
    cotton: 50,
    wool: 50,
  },
  image: "test",
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  await AddYarnToDB(devYarns);
};

export default function AddYarn() {
  return (
    <div className={`${styles["add-yarn-page"]} wrapper`}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Yarn Name" />
        <input type="text" placeholder="Yarn Color" />
        <input type="text" placeholder="Yarn Color Tag" />
        <input type="text" placeholder="Yarn Company" />
        <input type="text" placeholder="Yarn Materials" />
        <input type="text" placeholder="Yarn Image" />
        <button type="submit">Add Yarn</button>
      </form>
    </div>
  );
}
