import { IYarnSchema, IYarnsResponse } from "@/types/yarn.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const YARNS_QUERY_KEY = ["yarns"];

// API functions
async function fetchYarns(): Promise<IYarnsResponse> {
  const response = await fetch(`/api/yarns`);
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

async function updateYarnsWithPagination({
  page,
}: {
  page: number;
}): Promise<IYarnsResponse> {
  const response = await fetch(`/api/yarns?page=${page}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (data.status !== 200) {
    throw new Error(data.message || "Error updating yarns with pagination");
  }

  return data;
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
export function useYarns() {
  return useQuery<IYarnsResponse, Error>({
    queryKey: YARNS_QUERY_KEY,
    queryFn: fetchYarns,
    staleTime: 1000 * 60 * 10, // 10 minutes - prevents refetch when navigating between pages
  });
}

/**
 * Hook to add a new yarn
 * Invalidates cache to trigger refetch with fresh data
 */
export function useAddYarn() {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: createYarn,
    mutationFn: createYarn,
    onSuccess: async (newYarn) => {
      // Update the cache immediately for instant feedback
      queryClient.setQueryData<IYarnsResponse>(YARNS_QUERY_KEY, (old) => {
        if (!old) return old;
        return { ...old, data: [newYarn, ...old.data] };
      });
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
      queryClient.setQueryData<IYarnsResponse>(YARNS_QUERY_KEY, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((yarn) => {
            if (yarn._id === yarnId) {
              return { ...yarn, ...updatedYarn };
            }
            return yarn;
          }),
        };
      });
    },
  });
}

export function useUpdateYarnsWithPagination() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateYarnsWithPagination,
    onSuccess: async (updatedData: IYarnsResponse) => {
      queryClient.setQueryData<IYarnsResponse>(YARNS_QUERY_KEY, (old) => {
        if (!old) return old;
        return {
          ...updatedData,
          data: [...old.data, ...(updatedData?.data || [])],
        };
      });
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
        queryClient.getQueryData<IYarnsResponse>(YARNS_QUERY_KEY);

      // Optimistically remove from the list
      queryClient.setQueryData<IYarnsResponse>(YARNS_QUERY_KEY, (old) => {
        if (!old) return old;
        return { ...old, data: old.data.filter((yarn) => yarn._id !== yarnId) };
      });

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
