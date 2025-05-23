import { useState } from "react";
import NavBar from "./components/NavBar";
import { Theme } from "@radix-ui/themes";

function App() {
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  const toggleColorMode = () => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  };
  return (
    <>
      <Theme appearance={colorMode}>
        <NavBar colorMode={colorMode} toggleColorMode={toggleColorMode} />
        <main>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </main>
      </Theme>
    </>
  );
}

export default App;
