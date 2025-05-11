import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ThemeProviderWrapper from "./components/ThemeProviderWrapper";
import router from "./routes/router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProviderWrapper>
    <RouterProvider router={router} />
  </ThemeProviderWrapper>
);
