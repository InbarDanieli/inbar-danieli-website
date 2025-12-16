import { UserSessionData } from "@/lib/session";
import { useQuery } from "@tanstack/react-query";

async function fetchUser(): Promise<UserSessionData | null> {
  const response = await fetch(`/api/auth/user`);
  const data = await response.json();
  if (data.status !== 200) {
    throw new Error(data.message || "Error fetching user");
  }

  return data.data;
}

export function useUser() {
  return useQuery<UserSessionData | null, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 60, // 5 minutes - prevents refetch when navigating between pages
  });
}
