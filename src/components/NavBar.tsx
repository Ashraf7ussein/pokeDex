import { Text, Flex } from "@radix-ui/themes";
import { MdCatchingPokemon } from "react-icons/md";
import { RiMoonClearLine } from "react-icons/ri";
import { TbSun } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

interface Props {
  colorMode: "light" | "dark";
  toggleColorMode: () => void;
}

const NavBar = ({ colorMode }: Props) => {
  const { toggleTheme } = useTheme();
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center justify-between">
      <Link to={"/"} className="flex">
        <Flex align={"center"} gap={"3"}>
          <MdCatchingPokemon size={35} />
          <Text weight={"medium"} size={"5"}>
            Pokemon TCG
          </Text>
        </Flex>
      </Link>
      <button
        className="border rounded-full border-neutral-300 p-1"
        onClick={toggleTheme}
      >
        {colorMode === "dark" ? (
          <RiMoonClearLine size={"20"} />
        ) : (
          <TbSun size={"20"} />
        )}
      </button>
    </nav>
  );
};

export default NavBar;
