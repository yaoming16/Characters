import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./fonts.css";

import "./Aux/i18";

import App from "./App.jsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
