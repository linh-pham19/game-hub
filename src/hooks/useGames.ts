import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import { FetchResponse } from "../services/api-client";
import { Genre } from "./useGenres";
import apiClient from "../services/api-client";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}


// const useGames = (gameQuery: GameQuery) =>
//   useData<Game>(
//     "/games",
//     {
//       params: {
//         genres: gameQuery.genre?.id,
//         platforms: gameQuery.platform?.id,
//         ordering: gameQuery.sortOrder,
//         search: gameQuery.searchText
//       },
//     },
//     [gameQuery]
//   );

// THIS IS GOOD FOR ALL PAGES
// const useGames = (gameQuery: GameQuery) => useQuery<FetchResponse<Game>,Error>({
//   queryKey: ['games', gameQuery],
//   queryFn: () =>
//     apiClient.get<FetchResponse<Game>>('/games',{ params: {
//               genres: gameQuery.genre?.id,
//               parent_platforms: gameQuery.platform?.id,
//               ordering: gameQuery.sortOrder,
//               search: gameQuery.searchText
//             }
// })
//       .then(res => res.data),
//   // staleTime: 24 * 60 * 60 * 1000, // 24 hours
//   // initialData: [] // Use an empty array as initial data
// })

// THIS IS GOOD FOR INFINITE SCROLLING
const useGames = (gameQuery: GameQuery) => useInfiniteQuery<FetchResponse<Game>,Error>({
queryKey: ['games', gameQuery],
queryFn: ({ pageParam = 1 }) =>
  apiClient.get<FetchResponse<Game>>('/games', {
    params: {
      genres: gameQuery.genre?.id,
      parent_platforms: gameQuery.platform?.id,
      ordering: gameQuery.sortOrder,
      search: gameQuery.searchText,
      page: pageParam,
    },
  }).then(res => res.data),
  getNextPageParam: (lastPage, allPages) => {
    // If lastPage.next is a URL, increment page number
    // If lastPage.next is null, there are no more pages
    return lastPage.next ? allPages.length + 1 : undefined;
  }
,
initialPageParam:1,
  staleTime: 24 * 60 * 60 * 1000, // 24 hours
  // initialData: { pages: [{ results: [] }], pageParams: [] } // Use
})

// const useGames = (gameQuery: GameQuery, page: number) => useQuery<FetchResponse<Game>,Error>({
//   // react only refetch when page or gameQuery changes
//   queryKey: ["games",page, gameQuery],
//   queryFn: () => 
//     apiClient.get<FetchResponse<Game>>("/games", {
//       params: {
//         genres: gameQuery.genre?.id,
//         parent_platforms: gameQuery.platform?.id,
//         ordering: gameQuery.sortOrder,
//         search: gameQuery.searchText,
//         page: page,
//       },
//     }).then((res) => res.data),
//   staleTime: 24 * 60 * 60 * 1000, //
// })
export default useGames;
