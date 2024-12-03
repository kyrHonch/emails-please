import React from "react";
import { useNavigate } from "react-router-dom";
import "./Rules.css";

function Rules() {
  const navigate = useNavigate();

  const handleBackToMenu = () => {
    navigate("/");
  };

  return (
    <div className="rules-box">
      <h1>Rules</h1>
      <ol>
        <li>
          Using the provided tools you will try to find any discrepancies and
          weird details in the emails that you receive.
        </li>
        <li>
          If you fail to find a match, your total accuracy score will be
          decreased.
        </li>
      </ol>
      <button className="menu-button" onClick={handleBackToMenu}>
        Back
      </button>
    </div>
  );
}

export default Rules;
