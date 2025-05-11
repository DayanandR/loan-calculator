import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ExchangeRates from "../pages/ExchangeRates";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "exchange_rates", element: <ExchangeRates /> },

      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
