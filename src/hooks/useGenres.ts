import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import apiClient, {FetchResponse} from "../services/api-client";
import APIClient from "../services/api-client";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const apiClient = new APIClient<Genre>("/genres");

// const useGenres = () => ({ data: genres, isLoading: false, error: null })

// FIX: TO use react-qeury
const useGenres = () => useQuery({
  queryKey: ['genres'],
  // queryFn: () =>
  //   apiClient.get<FetchResponse<Genre>>('/genres')
  //     .then(res => res.data),
  queryFn: apiClient.getAll,
      staleTime: 24 * 60 * 60 * 1000, // 24 hours
      initialData: genres // Use local data as initial data
      // initialData: { count: genres.length, results: genres } // Use local data as initial data
  
})

export default useGenres;