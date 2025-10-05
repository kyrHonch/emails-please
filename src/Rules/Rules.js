import React from "react";
import {useNavigate} from "react-router-dom";
import "./Rules.css";

function Rules() {
    const navigate = useNavigate();

    const handleBackToMenu = () => {
        navigate("/");
    };

    return (
        <div className="rules-box">
            <h1>The Rules Are Simple</h1>
            {/*<ol>*/}
            {/*    <li>*/}
                    <h2>1. <u>Find</u> The Error.</h2>
                    {/*  Using the provided tools you will try to find any discrepancies and*/}
                    {/*weird details in the emails that you receive.*/}
                {/*</li>*/}
                {/*<li>*/}
                    <h2>2. <u>Select</u> The Error Type.</h2>
                    {/*If you fail to find a match, your total accuracy score will ue*/}
                    {/*decreased.*/}
                {/*</li>*/}
                {/*<li>*/}
                    <h2>3. <u>Locate</u> The Error.</h2>
                {/*</li>*/}
                {/*<li>*/}
                    <h2>4. If you are <u>right</u>, the <u>accuracy increases</u>.</h2>
                {/*</li>*/}
                {/*<li>*/}
                    <h2>5. If you are <u>wrong</u>, the <u>accuracy decreases</u>.</h2>
                {/*</li>*/}
                {/*<li>*/}
            <h2>6. <u>Make the choice.</u></h2>
            {/*    </li>*/}
            {/*</ol>*/}
            <button className="menu-button" onClick={handleBackToMenu}>
                Back
            </button>
        </div>
    );
}

export default Rules;
