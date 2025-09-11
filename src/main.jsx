import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/app/App.jsx";
import "@/shared/assets/styles/main.css";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./app/providers/theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);