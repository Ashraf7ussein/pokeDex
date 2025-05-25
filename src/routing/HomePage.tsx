import { Heading, Spinner, Text, TextField } from "@radix-ui/themes";
import CardsGrid from "../components/CardsGrid";
import SetsGrid from "../components/SetsGrid";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: { key: string }) => {
    if (e.key === "Enter") {
      setLoading(true);
      apiClient.get(`/cards?q=name:${searchText}`).then((res) => {
        setLoading(false);
        navigate("/search/q", { state: { cards: res.data.data } });
      });
    }
  };

  return (
    <>
      <main className="flex flex-col items-center px-10">
        <Heading size={"8"}>Pokémon TCG</Heading>
        <Text mt={"1"}>The Ultimate Pokémon Card Database</Text>
        <TextField.Root
          mt={"5"}
          size={"3"}
          placeholder="Search for a card.."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearch}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        {loading && <Spinner size={"3"} mt={"5"} />}
        <CardsGrid />
        <SetsGrid />
      </main>
    </>
  );
}

export default HomePage;
