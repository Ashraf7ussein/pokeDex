import { useState } from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  const toggleColorMode = () => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  };
  return (
    <div>
      <NavBar colorMode={colorMode} toggleColorMode={toggleColorMode} />
      <Outlet />
    </div>
  );
};

export default Layout;
