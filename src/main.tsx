import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@radix-ui/themes/styles.css";
import App from "./App.tsx";
import "./index.css";

const quetyClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={quetyClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
