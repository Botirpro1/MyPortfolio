import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/app/App.jsx";
import "@/shared/assets/styles/main.css";
import ThemeProvider from "./app/providers/theme";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);