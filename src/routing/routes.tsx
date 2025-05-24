import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import SetsPage from "./setsPage";
import Layout from "./Layout";
import SetDetailsPage from "./SetDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "sets", element: <SetsPage /> },
      { path: "sets/:id", element: <SetDetailsPage /> },
    ],
  },
]);

export default router;
