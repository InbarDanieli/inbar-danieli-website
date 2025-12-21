"use client";

import { PiYarn } from "react-icons/pi";
import styles from "./loader.module.scss";
import { useEffect, useState } from "react";

export default function Loader({size = 50}: {size?: number}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className={styles["loader"]}>
      <PiYarn size={size} />
    </div>
  );
}
