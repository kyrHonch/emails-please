import React from 'react';
import './Email.css';

function Email({ email, onFieldClick, selectedError, attemptedFields }) {
    const isFieldDisabled = (field) => {
        const currentAttempts = attemptedFields[selectedError] || [];
        return currentAttempts.includes(field);
    };

    const handleElementClick = (event, field) => {
        event.stopPropagation();
        if (selectedError && !isFieldDisabled(field)) {
            onFieldClick(field);
        }
    };

    return (
        <div className="email">
            <div
                className={`email-from ${isFieldDisabled('from') ? 'disabled' : selectedError ? 'hoverable' : ''}`}
                onClick={() => selectedError && !isFieldDisabled('from') && onFieldClick('from')}
            >
                From: {email.from}
            </div>

            {/* To Field */}
            <div
                className={`email-to ${isFieldDisabled('to') ? 'disabled' : selectedError ? 'hoverable' : ''}`}
                onClick={() => selectedError && !isFieldDisabled('to') && onFieldClick('to')}
            >
                To: {email.to}
            </div>

            {/* Header Field */}
            <div
                className={`email-header ${isFieldDisabled('header') ? 'disabled' : selectedError ? 'hoverable' : ''}`}
                onClick={() => selectedError && !isFieldDisabled('header') && onFieldClick('header')}
            >
                {email.header}
            </div>

            {/* Body Field */}
            <div
                className={`email-body ${isFieldDisabled('body') ? 'disabled' : selectedError ? 'hoverable' : ''}`}
                onClick={() => selectedError && !isFieldDisabled('body') && onFieldClick('body')}
            >
                {email.body}
            </div>
        </div>
    );
}

export default Email;