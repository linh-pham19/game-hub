import { Button, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { GameQuery } from "../App";
import useGames, { Platform } from "../hooks/useGames";
import { Genre } from "../hooks/useGenres";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import { useState } from "react";

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  // THI S IS GOOD FOR INFINITE SCROLLING
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useGames(gameQuery);

  // THIS IS GOOD FOR PAGINATION WITH PREV AND NEXT BTNS
  // const [page, setPage] = useState(1);
  // const { data, isLoading, error } = useGames(gameQuery, page);
  const skeletons = [1, 2, 3, 4, 5, 6];
  console.log("data", data);

  if (error) return <Text>{error.message}</Text>;

  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
        spacing={6}
      >
        {/* {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {data?.results.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))} */}
        {/* THIS IS FOR INFINITE SCROLLING */}
        {isFetchingNextPage &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {data?.pages.flatMap((page) =>
          page.results.map((game, index) => (
            <GameCardContainer key={game.id}>
              <GameCard game={game} />
            </GameCardContainer>
          ))
        )}
      </SimpleGrid>

      {hasNextPage && (
        <button
          style={{
            margin: "20px auto",
            display: "block",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#3182ce",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
};

export default GameGrid;

{
  /* THIS IS FOR PAGINATION WITH PREV AND NEXT BTNS */
}
{
  /* <HStack justifyContent="center" marginY={5}>
        <Button
          onClick={() => setPage((prev: number) => prev - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Text>Page {page}</Text>
        <Button
          onClick={() => setPage((prev: number) => prev + 1)}
          disabled={data?.results.length === 0 || !data?.next}
        >
          Next
        </Button>
      </HStack> */
}
