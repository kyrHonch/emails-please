import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ criteria, onSelect }) {
    const [selected, setSelected] = useState(null);

    const handleClick = (index) => {
        if (selected === index) {
            // If the same button is clicked again, unselect it
            setSelected(null);
            onSelect(null);
        } else {
            setSelected(index);
            onSelect(criteria[index]);
        }
    };

    return (
        <div className="sidebar">
            <ul className="criteria-list">
                {criteria.map((criterion, index) => (
                    <li
                        key={index}
                        className={`criteria-item ${selected === index ? 'selected' : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        {criterion}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;