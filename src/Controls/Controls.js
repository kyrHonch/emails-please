import React from 'react';
import './Controls.css';

function Controls({ on_click, onSend, isSendDisabled }) {
    return (
        <div className="controls">
            <button
                className={`button send ${isSendDisabled ? 'disabled' : ''}`}
                onClick={on_click}
                disabled={isSendDisabled}
            >
                Next
            </button>
        </div>
    );
}

export default Controls;