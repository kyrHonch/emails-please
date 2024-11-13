import React from 'react';
import './Controls.css';

function Controls({ onBlock, onSend }) {
    return (
        <div className="controls">
            <button className="button block" onClick={onBlock}>
                Block
            </button>
            <button className="button send" onClick={onSend}>
                Send
            </button>
        </div>
    );
}

export default Controls;