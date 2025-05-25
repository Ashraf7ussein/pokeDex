import { Grid, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import useCards from "../hooks/useCards";
import CardSkeleton from "./CardSkeleton";

const CardsGrid = () => {
  const { cards, error, isLoading } = useCards();

  const skeletonList = [1, 2, 3, 4, 5];

  return (
    <>
      {error ? (
        <p className="mt-35 text-red-500">{error.message}</p>
      ) : (
        <>
          <Text mt="9" size="5">
            Featured Cards
          </Text>
          <Grid
            gap="3"
            mt="3"
            columns={{ initial: "1", sm: "2", md: "3", lg: "5" }}
          >
            {isLoading
              ? skeletonList.map((skeleton) => <CardSkeleton key={skeleton} />)
              : cards?.map((card) => (
                  <Link to={`/sets/${card.id}/${card.id}`} key={card.id}>
                    <img
                      className="rounded-lg shadow hover:shadow-lg transition-transform hover:scale-105 duration-300"
                      src={card.images.small}
                      alt={card.name}
                    />
                  </Link>
                ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default CardsGrid;
