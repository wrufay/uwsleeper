import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Main from "./Main.tsx";
import Browse from "./Browse.tsx";
import Contribute from "./Contribute.tsx";
import Nav from "./Nav.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/contribute" element={<Contribute />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
