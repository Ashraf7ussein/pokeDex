import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import { Grid } from "@radix-ui/themes";

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

  const fetchSetDetails = () =>
    apiClient.get(`/cards?q=set.id:${id}`).then((res) => res.data.data);

  const {
    data: fetchedCards,
    error,
    isLoading,
  } = useQuery<Card[], Error>({
    queryKey: ["cards", id],
    queryFn: fetchSetDetails,
    enabled: !cardsFromState, //Only fetch if we don't already have the cards
  });

  const cardsToRender = cardsFromState || fetchedCards;

  if (!cardsToRender && isLoading) return <p>Loading...</p>;
  if (!cardsToRender && error) return <p>Error: {error.message}</p>;

  return (
    <>
      {cardsFromState && cardsFromState.length === 0 && <p>No items found!</p>}
      <Grid gap="3" px="9" mt="3" columns={{ initial: "2", md: "3", lg: "5" }}>
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
    </>
  );
};

export default SetDetailsPage;
