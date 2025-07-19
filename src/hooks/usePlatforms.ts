import platforms from "../data/platforms";
import APIClient from "../services/api-client";
import {useQuery} from "@tanstack/react-query";

const apiClient = new APIClient<Platform>("/platforms/list/parents");
export interface Platform {
  id: number;
  name: string;
  slug: string;
}

// const usePlatforms = () => ({ data: platforms, isLoading: false, error: null });

const usePlatforms = () => useQuery({
  queryKey: ["platforms"],
  queryFn: apiClient.getAll,
  staleTime: 24 * 60 * 60 * 1000, //
  // 24 hours
  initialData: { count: platforms.length, results: platforms } // Use local data
})
export default usePlatforms;
