import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./MainMenu/MainMenu";
import "./App.css";
import EmailInspection from "./EmailInspection/EmailInspection";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game/*" element={<EmailInspection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
