import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import MiPerfil from "./components/MiPerfil.jsx";
import Home from "./components/Home.jsx";

import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/miperfil" element={<MiPerfil />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
