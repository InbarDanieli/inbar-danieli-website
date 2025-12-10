import { SortOrder } from "mongoose";


export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface PaginationResult<T> {
  data: T[];
  page: number;
  nextPage: number | null;
  prevPage: number | null;
  count: number;
  totalPages: number;
}

export interface PaginateOptions {
  defaultLimit?: number;
  maxLimit?: number;
  sort?: { [key: string]: SortOrder };
}
