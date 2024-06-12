import React from "react";
import LandingPage from "./vendorDashboard/pages/LandingPage";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import NotFound from "./vendorDashboard/Components/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
