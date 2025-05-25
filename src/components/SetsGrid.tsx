import { Button, Card, Flex, Grid, Inset, Text } from "@radix-ui/themes";
import useSets from "../hooks/useSets";
import CardSkeleton from "./CardSkeleton";
import { Link } from "react-router-dom";

const SetsGrid = () => {
  const { sets, error, isLoading } = useSets();
  const skeletonList = [1, 2, 3, 4, 5];

  return (
    <>
      {error ? (
        <p className="mt-35 text-red-500">{error.message}</p>
      ) : (
        <>
          <Text mt="9" size="5">
            Featured Sets
          </Text>
          <Grid
            gap="3"
            my="5"
            columns={{ initial: "1", sm: "2", md: "3", lg: "5" }}
          >
            {isLoading
              ? skeletonList.map((skeleton) => <CardSkeleton key={skeleton} />)
              : sets?.map((set, index) => (
                  <Link key={index} to={`/sets/${set.id}`}>
                    <Card
                      key={set.id}
                      size="3"
                      className="rounded-lg shadow hover:shadow-lg transition-transform hover:scale-105 duration-300"
                    >
                      <Inset
                        side="top"
                        clip="padding-box"
                        className="bg-gray-100"
                      >
                        <img
                          className="w-full h-32 object-contain p-2"
                          src={set.images.logo}
                          alt={set.name}
                        />
                      </Inset>
                      <Flex direction="column" gap="2" p="3">
                        <Flex align="center" gap="3">
                          <img
                            className="w-10 h-10 object-contain hidden md:block"
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

          <Button mb={"9"}>
            <Link to="/sets">Sell All Sets</Link>
          </Button>
        </>
      )}
    </>
  );
};

export default SetsGrid;
