import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login";
import CallbackHandler from "./components/CallbackHandler";
import Dashboard from "./components/Dashboard";

function App() {
  console.log("Current routes available:", [
    "/",
    "/callback/:provider",
    "/dashboard",
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/callback/:provider" element={<CallbackHandler />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
