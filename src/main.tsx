import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "./fonts.css";

import "./Aux/i18";

import PracticeSheetPage from "./Components/Pages/PracticeSheetPage";
import DictionaryPage from "./Components/Pages/DictionaryPage";
import App from "./Components/Pages/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <PracticeSheetPage />,
      },
      {
        path: "dictionary",
        element: <DictionaryPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
