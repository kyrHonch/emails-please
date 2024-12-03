import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./MainMenu/MainMenu";
import Email from "./Email/Email";
import Rules from "./Rules/Rules";
import EmailInspection from "./EmailInspection/EmailInspection";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game/*" element={<Email />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
