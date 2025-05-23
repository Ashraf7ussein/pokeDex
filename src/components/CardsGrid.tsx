import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Grid, Text } from "@radix-ui/themes";

interface Card {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
}

const CardsGrid = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 100);

    apiClient
      .get(`/cards?pageSize=5&page=${randomPage}`)
      .then((res) => setCards(res.data.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      {error ? (
        <p className="mt-35 text-red-500">{error}</p>
      ) : (
        <>
          <Text mt="9" size="5">
            Featured Cards
          </Text>
          <Grid gap="3" mt="3" columns={{ initial: "2", md: "3", lg: "5" }}>
            {cards.map((card) => (
              <div key={card.id}>
                <img
                  className="rounded-lg shadow hover:shadow-lg transition-transform hover:scale-105 duration-300"
                  src={card.images.small}
                  alt={card.name}
                />
              </div>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default CardsGrid;
