import { Link, Text, Flex, Switch, Box } from "@radix-ui/themes";
import { MdCatchingPokemon } from "react-icons/md";

const NavBar = () => {
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
      <Box>
        <Text mx={"2"}>Dark Mode</Text>
        <Switch color="indigo" defaultChecked />
      </Box>
    </nav>
  );
};

export default NavBar;
