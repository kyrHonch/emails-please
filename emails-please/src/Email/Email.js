import React from "react";
import "./Email.css";

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
            {/* From Field */}
            <div
                className={`email-from ${isFieldDisabled("from") ? "disabled" : selectedError ? "hoverable" : ""}`}
                onClick={() => selectedError && !isFieldDisabled("from") && onFieldClick("from")}
            >
                From: {email.from}
            </div>

            {/* To Field */}
            <div
                className={`email-to ${isFieldDisabled("to") ? "disabled" : selectedError ? "hoverable" : ""}`}
                onClick={() => selectedError && !isFieldDisabled("to") && onFieldClick("to")}
            >
                To: {email.to}
            </div>

            {/* Header Field */}
            <div
                className={`email-header ${isFieldDisabled("header") ? "disabled" : selectedError ? "hoverable" : ""}`}
                onClick={() => selectedError && !isFieldDisabled("header") && onFieldClick("header")}
            >
                {email.header}
            </div>

            {/* Body Field */}
            <div
                className={`email-body ${isFieldDisabled("body") ? "disabled" : selectedError ? "hoverable" : ""}`}
                onClick={() => selectedError && !isFieldDisabled("body") && onFieldClick("body")}
            >
                {email.body}
            </div>

            {/* Images Section */}
            <div className="email-images">
                {email.images && email.images.length > 0 ? (
                    email.images.map((image, index) => (
                        <div
                            key={`image-${index}`}
                            className={`image-element ${isFieldDisabled(`image-${index}`) ? "disabled" : selectedError ? "hoverable" : ""}`}
                            onClick={(e) => {
                                if (selectedError && !isFieldDisabled(`image-${index}`)) {
                                    handleElementClick(e, `image-${index}`);
                                }
                            }}
                        >
                            <img src={image.src} alt={`${index + 1}`}/>
                            <p>{image.label || `Image ${index + 1}`}</p>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
}

export default Email;