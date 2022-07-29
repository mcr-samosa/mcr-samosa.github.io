import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "./routes/Container/Container";
import Home from "./routes/Home/Home";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="container/:containerId" element={<Container />} />
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
