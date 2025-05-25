import { DataList, Heading, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PokemonType, typeIcons } from "../constants/types";
import apiClient from "../services/api-client";
import ability from "../assets/ability.png";
import CardSkeleton from "../components/CardSkeleton";

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
    damage: String;
    name: String;
  }[];
  types: String[];
  images: {
    large: string;
  };
  weaknesses: {
    type: String;
    value: String;
  }[];
  rarity: String;
}

const CardDetailspage = () => {
  const { id, cardId } = useParams();

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
  const skeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (isLoading)
    return skeletonList.map((skeleton) => <CardSkeleton key={skeleton} />);
  if (error) return <Text color="red">Error: {error.message}</Text>;

  const TypeIcon = card?.types?.[0]
    ? typeIcons[card.types[0].toLowerCase() as PokemonType]
    : null;

  return (
    <div className="flex flex-col md:flex-row p-5 lg:p-20 gap-20">
      <img
        className="max-w-md w-full rounded-xl shadow-md"
        src={card?.images.large}
        alt={card?.name}
      />
      <DataList.Root>
        <Heading as="h2" size="8">
          {card?.name}
        </Heading>
        <DataList.Item className="border-b border-neutral-300 pb-3 mb-4">
          <DataList.Label>
            <Text size="5">
              {card?.supertype} - {card?.subtypes?.[0]}
            </Text>
          </DataList.Label>
          <DataList.Value>
            <Text size="5" mx={"2"}>
              HP {card?.hp}
            </Text>
            {TypeIcon && <img src={TypeIcon} className="w-[30px] h-[30px]" />}
          </DataList.Value>
        </DataList.Item>

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
            <Text size="5">{card?.cardmarket.prices.averageSellPrice}$</Text>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item className="border-b border-neutral-300 pb-3 mb-4">
          <DataList.Label>
            <Text size="4">Trend Price</Text>
          </DataList.Label>
          <DataList.Value>
            <Text size="5">{card?.cardmarket.prices.trendPrice}$</Text>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <img src={ability} className="w-[100px]" />
        </DataList.Item>
        {card?.abilities && card.abilities.length > 0 ? (
          card.abilities.map((ability) => (
            <DataList.Item key={ability.name} className="flex flex-col">
              <DataList.Label>
                <Text size="4">{ability.name} :</Text>
              </DataList.Label>
              <DataList.Value>
                <Text as="p" size="3" color="gray">
                  {ability.text}
                </Text>
              </DataList.Value>
            </DataList.Item>
          ))
        ) : (
          <Text as="p" size="4">
            N/A
          </Text>
        )}

        <DataList.Item>
          <Text size="5" weight="bold" mb="2">
            Attacks
          </Text>
        </DataList.Item>
        {card?.attacks && card.attacks.length > 0 ? (
          card.attacks.map((attack, index) => (
            <DataList.Item key={index} className="flex flex-col">
              <DataList.Label>
                <Text size="4">{attack.name} :</Text>
              </DataList.Label>
              <DataList.Value>
                <Text as="p" size="3" color="gray">
                  Damage: {attack.damage}
                </Text>
              </DataList.Value>
            </DataList.Item>
          ))
        ) : (
          <Text as="p" size="4">
            N/A
          </Text>
        )}
        <DataList.Item>
          <Text size="5" weight="bold" mb="2">
            Weaknesses
          </Text>
        </DataList.Item>
        {card?.weaknesses && card.weaknesses.length > 0 ? (
          card.weaknesses.map((weakness, index) => (
            <DataList.Item key={index} className="flex flex-col">
              <DataList.Label>
                <Text size="4">{weakness.type} :</Text>
              </DataList.Label>
              <DataList.Value>
                <Text as="p" size="3" color="gray">
                  Damage: {weakness.value}
                </Text>
              </DataList.Value>
            </DataList.Item>
          ))
        ) : (
          <Text as="p" size="4">
            N/A
          </Text>
        )}
        <DataList.Item>
          <DataList.Label>
            <Text size="4">Rarity</Text>
          </DataList.Label>
          <DataList.Value>
            <Text size="4">{card?.rarity}</Text>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </div>
  );
};

export default CardDetailspage;
