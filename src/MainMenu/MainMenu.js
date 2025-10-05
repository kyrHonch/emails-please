import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainMenu.css";

function MainMenu() {
  const navigate = useNavigate();

  const handleStartNewGame = () => {
    navigate("/game");
  };

  const handleRules = () => {
    navigate("/rules");
  };

  return (
    <div className="main-menu">
      <h1>Email Inspector</h1>
      <ul>
        <li>
          <button onClick={handleStartNewGame}>Start New Game</button>
        </li>
        <li>
          <button onClick={handleRules}>Rules</button>
        </li>
      </ul>
    </div>
  );
}

export default MainMenu;
