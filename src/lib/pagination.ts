import { NextRequest } from "next/server";
import { Model, FilterQuery } from "mongoose";
import {
  PaginateOptions,
  PaginationParams,
  PaginationResult,
} from "@/types/pagination.types";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

/**
 * Extract pagination parameters from request URL
 */
export function getPaginationParams(
  request: NextRequest,
  options: Pick<PaginateOptions, "defaultLimit" | "maxLimit"> = {}
): PaginationParams {
  const { defaultLimit = DEFAULT_LIMIT, maxLimit = MAX_LIMIT } = options;

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.max(
    1,
    Math.min(
      maxLimit,
      parseInt(searchParams.get("limit") || String(defaultLimit), 10)
    )
  );
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

/**
 * Build pagination metadata from count and params
 */
export function buildPaginationMeta(
  count: number,
  page: number,
  limit: number
): Omit<PaginationResult<unknown>, "data"> {
  const totalPages = Math.ceil(count / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  return { page, nextPage, prevPage, count, totalPages };
}

/**
 * Paginate a Mongoose model query
 *
 * @example
 * // Basic usage
 * const result = await paginate(request, Yarn, { userId });
 *
 * @example
 * // With options
 * const result = await paginate(request, Yarn, { userId }, {
 *   defaultLimit: 20,
 *   sort: { createdAt: -1 }
 * });
 */
export async function paginate<T>({
  page,
  limit,
  skip,
  model,
  filter = {},
  options = {},
}: {
  page: number;
  limit: number;
  skip: number;
  model: Model<T>;
  filter: FilterQuery<T>;
  options: PaginateOptions;
}): Promise<PaginationResult<T>> {
  const { sort = { _id: -1 } } = options;
  
  // Run count and find queries in parallel for better performance
  const [count, data] = await Promise.all([
    model.countDocuments(filter),
    model.find(filter).sort(sort).skip(skip).limit(limit),
  ]);

  const meta = buildPaginationMeta(count, page, limit);

  return { data, ...meta };
}

/**
 * Returns empty pagination result (useful for error handling)
 */
export function emptyPaginationResult<T>(): PaginationResult<T> {
  return {
    data: [],
    page: 1,
    nextPage: null,
    prevPage: null,
    count: 0,
    totalPages: 0,
  };
}
