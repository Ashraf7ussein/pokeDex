import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface FetchCardResponse {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
}

const useCards = () => {
  const randomPage = Math.floor(Math.random() * 100);

  const fetchCards = () =>
    apiClient
      .get(`/cards?pageSize=5&page=${randomPage}`)
      .then((res) => res.data.data);

  const {
    data: cards,
    error,
    isLoading,
  } = useQuery<FetchCardResponse[], Error>({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });

  return { cards, error, isLoading };
};

export default useCards;
