"use client";

import { PiYarn } from "react-icons/pi";
import styles from "./loader.module.scss";
import { useEffect, useState } from "react";

export default function Loader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className={styles["loader"]}>
      <PiYarn size={50} />
    </div>
  );
}
