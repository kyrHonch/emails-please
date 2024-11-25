import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ criteria, onSelect }) {
    const [selected, setSelected] = useState(null);

    const handleClick = (index, criterion) => {
        if (selected === index) {
            setSelected(null);
            onSelect(null);
        } else {
            setSelected(index);
            onSelect(criterion);
        }
    };

    return (
        <div className="sidebar">
            {criteria.map((criterion, index) => (
                <div
                    key={index}
                    className={`criteria-item ${selected === index ? 'selected' : ''}`}
                    onClick={() => handleClick(index, criterion)}
                >
                    {criterion}
                </div>
            ))}
        </div>
    );
}

export default Sidebar;