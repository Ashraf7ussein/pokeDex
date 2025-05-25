import { Heading, Text } from "@radix-ui/themes";
import CardsGrid from "../components/CardsGrid";
import SetsGrid from "../components/SetsGrid";

function HomePage() {
  return (
    <>
      <main className="flex flex-col items-center px-10">
        <Heading size={"8"}>Pokémon TCG</Heading>
        <Text mt={"1"}>The Ultimate Pokémon Card Database</Text>
        <CardsGrid />
        <SetsGrid />
      </main>
    </>
  );
}

export default HomePage;
