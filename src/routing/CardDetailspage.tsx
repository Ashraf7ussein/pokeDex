import { DataList, Heading, Spinner, Text, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { PokemonType, typeIcons } from "../constants/types";
import apiClient from "../services/api-client";
import ability from "../assets/ability.png";
import { useState } from "react";

interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  cardmarket: {
    prices: {
      trendPrice: string;
      averageSellPrice: string;
    };
  };
  abilities: {
    name: string;
    text: string;
  }[];
  attacks: {
    damage: string;
    name: string;
  }[];
  types: string[];
  images: {
    large: string;
  };
  weaknesses: {
    type: string;
    value: string;
  }[];
  rarity: string;
  evolvesFrom: string;
  set: {
    id: string;
    name: string;
  };
}

const CardDetailspage = () => {
  const { id, cardId } = useParams();
  const navigate = useNavigate();
  const [evolveLoading, setEvolveLoading] = useState(false);
  const [packLoading, setPackLoading] = useState(false);

  const fetchCardDetails = () =>
    apiClient.get(`/cards/${cardId}`).then((res) => res.data.data);

  const {
    data: card,
    error,
    isLoading,
  } = useQuery<Card, Error>({
    queryKey: ["cards", id, cardId],
    queryFn: fetchCardDetails,
  });

  if (error) return <Text color="red">Error: {error.message}</Text>;

  const TypeIcon = card?.types?.[0]
    ? typeIcons[card.types[0].toLowerCase() as PokemonType]
    : null;

  const handleSearch = (flag: string, name: string | undefined) => {
    if (flag === "evolves") {
      setEvolveLoading(true);
      apiClient.get(`/cards?q=name:${name}`).then((res) => {
        setEvolveLoading(false);
        navigate("/search/q", { state: { cards: res.data.data } });
      });
    } else {
      setPackLoading(true);
      apiClient.get(`/cards?q=set.id:${name}`).then((res) => {
        setPackLoading(false);
        navigate(`/sets/${name}`, { state: { cards: res.data.data } });
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-5 lg:p-20 gap-20">
      {isLoading ? (
        <Skeleton className="w-full max-w-md h-[450px] rounded-xl" />
      ) : (
        <img
          className="max-w-md w-full rounded-xl shadow-lg"
          src={card?.images.large}
          alt={card?.name}
        />
      )}

      <DataList.Root>
        <Heading as="h2" size="8" className="mb-4">
          {isLoading ? <Skeleton width="200px" height="32px" /> : card?.name}
        </Heading>

        <DataList.Item>
          <DataList.Label>
            {isLoading ? (
              <Skeleton width="150px" />
            ) : (
              <Text size="5">
                {card?.supertype}{" "}
                {card?.subtypes?.[0] && `- ${card.subtypes[0]}`}
              </Text>
            )}
          </DataList.Label>
          <DataList.Value className="flex items-center gap-3">
            {isLoading ? (
              <Skeleton width="100px" />
            ) : (
              <>
                <Text size="5">HP {card?.hp}</Text>
                {TypeIcon && (
                  <img
                    src={TypeIcon}
                    alt="Type Icon"
                    className="w-[30px] h-[30px]"
                  />
                )}
              </>
            )}
          </DataList.Value>
        </DataList.Item>

        {card?.evolvesFrom && (
          <DataList.Item>
            <DataList.Label>
              <Text size="5">Evolves From</Text>
            </DataList.Label>
            <DataList.Value>
              <Text
                as="p"
                size="4"
                onClick={() => handleSearch("evolves", card?.evolvesFrom)}
                className="flex items-center gap-2 cursor-pointer text-blue-600 hover:underline"
              >
                {card.evolvesFrom}
                {evolveLoading && <Spinner size="3" mt="1" />}
              </Text>
            </DataList.Value>
          </DataList.Item>
        )}

        {card?.set && (
          <DataList.Item className="border-b border-neutral-300 pb-3 mb-4">
            <DataList.Label>
              <Text size="5">Set</Text>
            </DataList.Label>
            <DataList.Value>
              <Text
                as="p"
                size="4"
                onClick={() => handleSearch("set", card?.set.id)}
                className="flex items-center gap-2 cursor-pointer text-blue-600 hover:underline"
              >
                {card.set.name}
                {packLoading && <Spinner size="3" mt="1" />}
              </Text>
            </DataList.Value>
          </DataList.Item>
        )}

        <DataList.Item>
          <Text size="5" weight="bold" mb="2">
            Prices
          </Text>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>
            <Text size="4">Avg Sell Price</Text>
          </DataList.Label>
          <DataList.Value>
            {isLoading ? (
              <Skeleton width="80px" />
            ) : (
              <Text size="5">{card?.cardmarket.prices.averageSellPrice}$</Text>
            )}
          </DataList.Value>
        </DataList.Item>
        <DataList.Item className="border-b border-neutral-300 pb-3 mb-4">
          <DataList.Label>
            <Text size="4">Trend Price</Text>
          </DataList.Label>
          <DataList.Value>
            {isLoading ? (
              <Skeleton width="80px" />
            ) : (
              <Text size="5">{card?.cardmarket.prices.trendPrice}$</Text>
            )}
          </DataList.Value>
        </DataList.Item>

        {card?.abilities && (
          <>
            <DataList.Item>
              <img src={ability} className="w-[100px]" />

              {card.abilities.map((ability, index) => (
                <DataList.Item key={index}>
                  <DataList.Label>
                    <Text size="4">{ability.name} :</Text>
                  </DataList.Label>
                  <DataList.Value>
                    <Text as="p" size="3" color="gray">
                      {ability.text}
                    </Text>
                  </DataList.Value>
                </DataList.Item>
              ))}
            </DataList.Item>
          </>
        )}

        {card?.attacks && (
          <>
            <DataList.Item>
              <Text size="5" weight="bold">
                Attacks
              </Text>

              {card.attacks.map((attack, index) => (
                <DataList.Item key={index}>
                  <DataList.Label>
                    <Text size="4">{attack.name} :</Text>
                  </DataList.Label>
                  <DataList.Value>
                    <Text as="p" size="3" color="gray">
                      Damage: {attack.damage}
                    </Text>
                  </DataList.Value>
                </DataList.Item>
              ))}
            </DataList.Item>
          </>
        )}

        {card?.weaknesses && (
          <>
            <DataList.Item>
              <Text size="5" weight="bold">
                Weaknesses
              </Text>

              {card.weaknesses.map((weakness, index) => (
                <DataList.Item key={index}>
                  <DataList.Label>
                    <img
                      src={
                        typeIcons[weakness.type.toLowerCase() as PokemonType]
                      }
                      alt="Type Icon"
                      className="w-[25px] h-[25px]"
                    />
                  </DataList.Label>
                  <DataList.Value>
                    <Text as="p" size="3" color="gray">
                      Damage: {weakness.value}
                    </Text>
                  </DataList.Value>
                </DataList.Item>
              ))}
            </DataList.Item>
          </>
        )}

        <DataList.Item>
          <DataList.Label>
            <Text size="4">Rarity</Text>
          </DataList.Label>
          <DataList.Value>
            {isLoading ? (
              <Skeleton width="80px" />
            ) : (
              <Text as="p" size="3" color="gray">
                {card?.rarity}
              </Text>
            )}
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </div>
  );
};

export default CardDetailspage;
