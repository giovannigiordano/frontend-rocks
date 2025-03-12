import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import { Detail } from "./Detail";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/frontend-rocks" element={<App />} />
        <Route path="/frontend-rocks/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
