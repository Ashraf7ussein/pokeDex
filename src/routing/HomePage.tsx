import { useState } from "react";
import NavBar from "../components/NavBar";
import { Heading, Theme, Text } from "@radix-ui/themes";
import CardsGrid from "../components/CardsGrid";

function HomePage() {
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  const toggleColorMode = () => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  };
  return (
    <>
      <Theme appearance={colorMode}>
        <NavBar colorMode={colorMode} toggleColorMode={toggleColorMode} />
        <main className="flex flex-col items-center px-10">
          <Heading size={"8"}>Pokémon TCG</Heading>
          <Text mt={"1"}>The Ultimate Pokémon Card Database</Text>
          <CardsGrid />
        </main>
      </Theme>
    </>
  );
}

export default HomePage;
