import React from "react";
import "./Email.css";

function Email({
                   email = {},
                   onFieldClick,
                   selectedError,
                   permanentlyDisabledFields,
                   temporarilyDisabledFields,
                   fieldHighlights,
               }) {
    const isFieldDisabled = (field) => {
        // Check if the field is permanently disabled
        if (permanentlyDisabledFields.includes(field)) {
            return true;
        }
        // Check if the field is temporarily disabled for the selected error type
        const currentAttempts = temporarilyDisabledFields[selectedError] || [];
        return currentAttempts.includes(field);
    };

    const getHighlightClass = (field) => {
        return fieldHighlights[field] === "correct"
            ? "correct"
            : fieldHighlights[field] === "incorrect"
                ? "incorrect"
                : "";
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
                className={`email-from ${getHighlightClass("from")} ${
                    isFieldDisabled("from") ? "disabled" : selectedError ? "hoverable" : ""
                }`}
                onClick={() => selectedError && !isFieldDisabled("from") && onFieldClick("from")}
            >
                From: {email.from || "No sender"}
            </div>

            {/* To Field */}
            <div
                className={`email-to ${getHighlightClass("to")} ${
                    isFieldDisabled("to") ? "disabled" : selectedError ? "hoverable" : ""
                }`}
                onClick={() => selectedError && !isFieldDisabled("to") && onFieldClick("to")}
            >
                To: {email.to || "No recipient"}
            </div>

            {/* Header Field */}
            <div
                className={`email-header ${getHighlightClass("header")} ${
                    isFieldDisabled("header") ? "disabled" : selectedError ? "hoverable" : ""
                }`}
                onClick={() => selectedError && !isFieldDisabled("header") && onFieldClick("header")}
            >
                {email.header || "No subject"}
            </div>

            {/* Body Field */}
            <div
                className={`email-body ${getHighlightClass("body")} ${
                    isFieldDisabled("body") ? "disabled" : selectedError ? "hoverable" : ""
                }`}
                onClick={() => selectedError && !isFieldDisabled("body") && onFieldClick("body")}
            >
                {email.body || "No body content"}
            </div>

            {/* Images Section */}
            <div className="email-images">
                {email.images && email.images.length > 0 ? (
                    email.images.map((image, index) => (
                        <div
                            key={`image-${index}`}
                            className={`image-element ${getHighlightClass(`image-${index}`)} ${
                                isFieldDisabled(`image-${index}`) ? "disabled" : selectedError ? "hoverable" : ""
                            }`}
                            onClick={(e) => {
                                if (selectedError && !isFieldDisabled(`image-${index}`)) {
                                    handleElementClick(e, `image-${index}`);
                                }
                            }}
                        >
                            <img src={image.src} alt={`${index + 1}`} />
                            <p>{image.label || `Image ${index + 1}`}</p>
                        </div>
                    ))
                ) : (
                    <p>No Images Found</p>
                )}
            </div>
        </div>
    );
}

export default Email;