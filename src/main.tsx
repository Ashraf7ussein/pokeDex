import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

const quetyClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={quetyClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>{" "}
  </StrictMode>
);
