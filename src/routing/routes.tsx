import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import Layout from "./Layout";
import SetDetailsPage from "./SetDetailsPage";
import CardDetailspage from "./CardDetailspage";
import SetsPage from "./SetsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "sets", element: <SetsPage /> },
      { path: "sets/:id", element: <SetDetailsPage /> },
      { path: "sets/:id/:cardId", element: <CardDetailspage /> },
    ],
  },
]);

export default router;
