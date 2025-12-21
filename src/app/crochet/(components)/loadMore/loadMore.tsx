"use client";

import Button from "../button/button";
import Loader from "../loaders/loader/loader";
import styles from "./loadMore.module.scss";

interface PaginationProps {
  nextPage: number | null;
  onPageChange: (page: number) => void;
  className?: string;
  loading?: boolean;
}

export default function LoadMore({
  nextPage,
  onPageChange,
  className = "",
  loading = false,
}: PaginationProps) {
  if (nextPage === null) return null;

  const handleNext = () => {
    if (nextPage !== null) onPageChange(nextPage);
  };

  if (loading) return <Loader size={20}/>

  return (
    <nav
      className={`${styles.pagination} ${className}`}
      aria-label="Pagination"
    >
      <Button variant="primary-color" onclick={handleNext}>Load More</Button>
    </nav>
  );
}
