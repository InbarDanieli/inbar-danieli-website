"use client";

import styles from "./loadMore.module.scss";


interface PaginationProps {
  nextPage: number | null;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function LoadMore({
  nextPage,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (nextPage === null) return null;

  const handleNext = () => {
    if (nextPage !== null) onPageChange(nextPage);
  };

  return (
    <nav
      className={`${styles.pagination} ${className}`}
      aria-label="Pagination"
    >
      <button onClick={handleNext}>Load More</button>
    </nav>
  );
}
