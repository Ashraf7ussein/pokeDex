import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import { Box, Grid, Heading } from "@radix-ui/themes";
import CardSkeleton from "../components/CardSkeleton";

interface Card {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
}

const SetDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const cardsFromState: Card[] = location.state?.cards;
  const cardsTitle: String = location.state?.searchText;
  const packDetails = location.state?.packDetails;

  const fetchSetDetails = () =>
    apiClient.get(`/cards?q=set.id:${id}`).then((res) => res.data.data);

  const {
    data: fetchedCards,
    error,
    isLoading,
  } = useQuery<Card[], Error>({
    queryKey: ["cards", id],
    queryFn: fetchSetDetails,
    enabled: !cardsFromState,
  });

  const skeletonList = Array.from({ length: 10 });

  const cardsToRender = cardsFromState || fetchedCards;

  if (!cardsToRender && isLoading)
    return (
      <>
        <Grid
          gap="3"
          p={"5"}
          mt="3"
          columns={{ initial: "2", sm: "3", md: "4", lg: "5" }}
        >
          {skeletonList.map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </Grid>
      </>
    );

  if (!cardsToRender && error) return <p>Error: {error.message}</p>;

  return (
    <Box px="9">
      <Box>
        {packDetails?.images?.logo && (
          <img src={packDetails?.images?.logo} className="max-w-xl mb-16" />
        )}
        <Heading as="h2" mb="5">
          {cardsTitle || packDetails?.name || "Cards"}
        </Heading>
      </Box>

      {cardsFromState && cardsFromState.length === 0 && <p>No items found!</p>}
      <Grid
        gap="3"
        mt="3"
        columns={{ initial: "2", sm: "3", md: "4", lg: "5" }}
      >
        {cardsToRender?.map((card) => (
          <Link to={`/sets/${id}/${card.id}`} key={card.id}>
            <img
              className="rounded-lg shadow hover:shadow-lg transition-transform hover:scale-105 duration-300"
              src={card.images.small}
              alt={card.name}
            />
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default SetDetailsPage;
