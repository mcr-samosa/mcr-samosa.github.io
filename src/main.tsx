import React from "react";
import ReactDOM from "react-dom/client";
import "bulma/css/bulma.min.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SnackContainer from "./routes/SnackContainer/SnackContainer";
import Home from "./routes/Home/Home";
import Footer from "./components/Footer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="container/:containerId" element={<SnackContainer />} />
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
    <Footer />
  </React.StrictMode>
);
