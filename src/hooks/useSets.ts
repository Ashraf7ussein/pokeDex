import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface FetchSetsResponse {
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
const useSets = () => {
  const pageSize = 5;
  const maxPages = Math.ceil(165 / pageSize);
  const randomPage = Math.floor(Math.random() * maxPages) + 1;

  const fetchSets = () =>
    apiClient
      .get(`/sets?pageSize=${pageSize}&page=${randomPage}`)
      .then((res) => res.data.data);

  const {
    data: sets,
    error,
    isLoading,
  } = useQuery<FetchSetsResponse[], Error>({
    queryKey: ["sets"],
    queryFn: fetchSets,
  });

  return { sets, error, isLoading };
};

export default useSets;
