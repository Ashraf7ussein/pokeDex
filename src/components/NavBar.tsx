import { Link, Text, Flex, Switch, Box } from "@radix-ui/themes";
import { MdLightMode, MdDarkMode, MdCatchingPokemon } from "react-icons/md";

interface Props {
  colorMode: "light" | "dark";
  toggleColorMode: () => void;
}

const NavBar = ({ colorMode, toggleColorMode }: Props) => {
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center justify-between">
      <Link href="/" className="flex">
        <Flex align={"center"} gap={"3"}>
          <MdCatchingPokemon size={35} />
          <Text weight={"medium"} size={"5"}>
            Pokemon TCG
          </Text>
        </Flex>
      </Link>
      <button
        className="border rounded-full border-neutral-300 p-1"
        onClick={() => toggleColorMode()}
      >
        {colorMode === "dark" ? (
          <MdDarkMode size={"20"} />
        ) : (
          <MdLightMode size={"20"} />
        )}
      </button>
    </nav>
  );
};

export default NavBar;
