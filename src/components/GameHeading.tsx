import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";
import useGenres from "../hooks/useGenres";
// import usePlatforms from "../hooks/usePlatforms";
import usePlatform from "../hooks/usePlatform";
import useGenre from "../hooks/useGenre";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  // const { data: genres } = useGenres();
  // const { data: platforms } = usePlatforms();

  // console.log("gameQuery:", gameQuery);
  // console.log("genres:", genres);
  // console.log("platforms:", platforms);

  // const genre = genres?.results.find((g) => g.id === gameQuery.genreId);
  // const platform = platforms?.results.find(
  //   (p) => p.id === gameQuery.platformId
  // );
  const genre = useGenre(gameQuery.genreId);
  const platform = usePlatform(gameQuery.platformId);

  const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default GameHeading;
