import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { IYarnSchema, IYarnsResponse } from "@/types/yarn.types";

const YARNS_QUERY_KEY = ["yarns"];

// Helper to get cached yarns directly
function getCachedYarns(queryClient: QueryClient): IYarnSchema[] | undefined {
  return queryClient.getQueryData<IYarnSchema[]>(YARNS_QUERY_KEY);
}

// API functions
async function fetchYarns({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}): Promise<IYarnsResponse> {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page.toString());
  if (limit) queryParams.set("limit", limit.toString());
  const queryString = queryParams.toString();

  const response = await fetch(`/api/yarns?${queryString}`);
  const data = await response.json();
  if (data.status !== 200) {
    throw new Error(data.message || "Error fetching yarns");
  }

  return data;
}

async function createYarn(
  yarnData: Omit<IYarnSchema, "_id">
): Promise<IYarnSchema> {
  const response = await fetch("/api/yarns", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(yarnData),
  });
  const data = await response.json();
  if (data.status !== 200) {
    throw new Error(data.message || "Error creating yarn");
  }
  return data.data;
}

async function updateYarn({
  yarnId,
  yarnData,
}: {
  yarnId: string;
  yarnData: Partial<IYarnSchema>;
}): Promise<IYarnSchema> {
  const response = await fetch(`/api/yarns/${yarnId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(yarnData),
  });
  const data = await response.json();
  if (data.status !== 200) {
    throw new Error(data.message || "Error updating yarn");
  }
  return data.data;
}

async function deleteYarnApi(yarnId: string): Promise<void> {
  const response = await fetch(`/api/yarns/${yarnId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (data.status !== 200) {
    throw new Error(data.message || "Error deleting yarn");
  }
}

// Hooks

/**
 * Hook to fetch all yarns with caching
 */
export function useYarns({
  page,
  limit,
}: { page?: number; limit?: number } = {}) {
  return useQuery<IYarnsResponse, Error>({
    queryKey: YARNS_QUERY_KEY,
    queryFn: () => fetchYarns({ page, limit }),
    staleTime: 1000 * 60 * 5, // 5 minutes - prevents refetch when navigating between pages
  });
}

/**
 * Hook to get a single yarn by ID - reads directly from cached yarns list
 * No separate API call needed!
 */
export function useYarn(yarnId: string) {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useYarns();
  const yarns = data?.data;

  // Check cache directly for immediate access (avoids loading flash)
  const cachedYarns = getCachedYarns(queryClient);
  const yarn =
    yarns?.find((y: IYarnSchema) => y._id === yarnId) ??
    cachedYarns?.find((y: IYarnSchema) => y._id === yarnId);

  // Only show loading if we don't have the yarn in cache at all
  const isLoading = isPending && !yarn;

  return {
    data: yarn,
    isPending: isLoading,
    error,
    // Useful for edit page to know if yarn wasn't found (vs still loading)
    isNotFound: !isLoading && !error && !yarn,
  };
}

/**
 * Hook to add a new yarn
 * Invalidates cache to trigger refetch with fresh data
 */
export function useAddYarn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createYarn,
    onSuccess: async (newYarn) => {
      // Update the cache immediately for instant feedback
      queryClient.setQueryData<IYarnSchema[]>(YARNS_QUERY_KEY, (old) => {
        if (old) {
          return [...old, newYarn];
        }
        return [newYarn];
      });
      // Also invalidate to ensure consistency
      await queryClient.invalidateQueries({ queryKey: YARNS_QUERY_KEY });
    },
  });
}

/**
 * Hook to update an existing yarn
 * Invalidates cache to trigger refetch with fresh data
 */
export function useUpdateYarn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateYarn,
    onSuccess: async (updatedYarn, { yarnId }) => {
      // Update the cache immediately for instant feedback
      queryClient.setQueryData<IYarnSchema[]>(YARNS_QUERY_KEY, (old) => {
        if (!old) return [updatedYarn];
        return old.map((yarn) => (yarn._id === yarnId ? updatedYarn : yarn));
      });
      // Also invalidate to ensure consistency
      await queryClient.invalidateQueries({ queryKey: YARNS_QUERY_KEY });
    },
  });
}

/**
 * Hook to delete a yarn
 * Removes from cache immediately (optimistic update)
 */
export function useDeleteYarn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteYarnApi,
    onMutate: async (yarnId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: YARNS_QUERY_KEY });

      // Snapshot the previous value
      const previousYarns =
        queryClient.getQueryData<IYarnSchema[]>(YARNS_QUERY_KEY);

      // Optimistically remove from the list
      queryClient.setQueryData<IYarnSchema[]>(YARNS_QUERY_KEY, (old) =>
        old?.filter((yarn) => yarn._id !== yarnId)
      );

      // Return context with the snapshot
      return { previousYarns };
    },
    onError: (_err, _yarnId, context) => {
      // Rollback on error
      if (context?.previousYarns) {
        queryClient.setQueryData(YARNS_QUERY_KEY, context.previousYarns);
      }
    },
  });
}
