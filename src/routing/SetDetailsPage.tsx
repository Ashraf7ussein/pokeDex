import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
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

  const fetchSetDetails = async (): Promise<Card[]> => {
    const res = await apiClient.get(`/cards?q=set.id:${id}`);
    return res.data.data;
  };

  const { data, error, isLoading } = useQuery<Card[], Error>({
    queryKey: ["cards", id],
    queryFn: fetchSetDetails,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Grid gap="3" px={"9"} mt="3" columns={{ initial: "2", md: "3", lg: "5" }}>
      {data?.map((card) => (
        <div key={card.id}>
          <img
            className="rounded-lg shadow hover:shadow-lg transition-transform hover:scale-105 duration-300"
            src={card.images.small}
            alt={card.name}
          />
        </div>
      ))}
    </Grid>
  );
};

export default SetDetailsPage;
