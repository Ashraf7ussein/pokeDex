import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Card, Flex, Grid, Inset, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

interface Set {
  id: string;
  name: string;
  releaseDate: string;
  images: {
    logo: string;
    symbol: string;
  };
  legalities: {
    unlimited: string;
  };
}

const SetsPage = () => {
  const fetchSets = () => apiClient.get(`/sets`).then((res) => res.data.data);

  const {
    data: sets,
    error,
    isLoading,
  } = useQuery<Set[], Error>({
    queryKey: ["sets"],
    queryFn: fetchSets,
  });

  if (isLoading) return <Text size="4">Loading sets...</Text>;
  if (error) return <Text color="red">Error: {error.message}</Text>;

  return (
    <Grid
      px="5"
      gap="4"
      mt="4"
      columns={{ initial: "1", sm: "2", md: "3", lg: "5" }}
    >
      {sets?.map((set) => (
        <Link to={`/sets/${set.id}`}>
          <Card
            key={set.id}
            size="3"
            className="shadow-md rounded-2xl overflow-hidden transition hover:shadow-lg"
          >
            <Inset side="top" clip="padding-box" className="bg-gray-100">
              <img
                className="w-full h-32 object-contain p-2"
                src={set.images.logo}
                alt={set.name}
              />
            </Inset>
            <Flex direction="column" gap="2" p="3">
              <Flex align="center" gap="3">
                <img
                  className="w-10 h-10 object-contain"
                  src={set.images.symbol}
                  alt={set.name}
                />
                <Text size="4" weight="bold">
                  {set.name}
                </Text>
              </Flex>
              <Text size="2" color="gray">
                Released: {set.releaseDate}
              </Text>
              <Text size="2" color="gray">
                {set.legalities.unlimited}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Grid>
  );
};

export default SetsPage;
