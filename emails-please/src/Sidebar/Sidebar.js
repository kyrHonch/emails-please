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
            <h3>Select an Error</h3>
            {criteria.map((criterion, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(index, criterion)}
                    className={selected === index ? 'selected' : ''}
                >
                    {criterion}
                </button>
            ))}
        </div>
    );
}

export default Sidebar;