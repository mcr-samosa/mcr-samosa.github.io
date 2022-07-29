import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "./routes/Container";
import Box from "./routes/Box";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="container/:containerId" element={<Container />} />
        <Route path="box" element={<Box />} />
        <Route
          path="*"
          element={
            <main>
              <div>What are you doing!?</div>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
