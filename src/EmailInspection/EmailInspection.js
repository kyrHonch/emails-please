import React, { useState, useEffect } from "react";
import Email from "../Email/Email";
import Controls from "../Controls/Controls";
import Sidebar from "../Sidebar/Sidebar";
import "./EmailInspection.css";

function EmailInspection() {
  const [selectedError, setSelectedError] = useState(null);
  const [matchStatus, setMatchStatus] = useState(null);
  const [isSendDisabled, setIsSendDisabled] = useState(true);
  const [accuracyScore, setAccuracyScore] = useState(63.9);
  const [attemptedFields, setAttemptedFields] = useState({});
  const [totalErrors, setTotalErrors] = useState(0); // Total errors in all emails
  const [correctlyIdentifiedErrors, setCorrectlyIdentifiedErrors] = useState(0); // Correctly identified errors
  const [emails, setEmails] = useState([]);
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [fieldHighlights, setFieldHighlights] = useState({});
  const [isCompletePopupVisible, setIsCompletePopupVisible] = useState(false);
  const [permanentlyDisabledFields, setPermanentlyDisabledFields] = useState([]); // Fields disabled for all errors
  const [temporarilyDisabledFields, setTemporarilyDisabledFields] = useState({}); // Fields disabled for specific error types
  const [foundErrorsInCurrentEmail, setFoundErrorsInCurrentEmail] = useState(0); // Track errors found in current email

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(`/data/emails_level_1.json`);
        const data = await response.json();
        setEmails(data);
        setCurrentEmailIndex(0);
        const totalErrorsInEmails = data.reduce(
            (total, email) => total + email.Errors.length,
            0
        );
        setTotalErrors(totalErrorsInEmails); // Set the total errors
      } catch (error) {
        console.error("Error loading emails:", error);
      }
    };

    fetchEmails();
  }, []);

  const handleSelection = (errorType) => {
    setSelectedError(errorType);
    setMatchStatus(null);
  };

  const handleFieldClick = (field) => {
    if (!selectedError) {
      alert("Please select an error type first!");
      return;
    }

    // If the field is already permanently disabled, do nothing
    if (permanentlyDisabledFields.includes(field)) {
      return;
    }

    // Get fields temporarily disabled for this error type
    const currentAttempts = temporarilyDisabledFields[selectedError] || [];
    if (currentAttempts.includes(field)) {
      return; // Prevent reattempting the same field for the same error
    }

    const currentEmail = emails[currentEmailIndex];

    // Map UI field names to JSON field names for better detection
    const fieldMapping = {
      'from': 'emailsender',
      'to': 'emailreceiver',
      'header': 'header',
      'body': 'body'
    };

    // Normalize the field name for comparison
    let normalizedField = field.toLowerCase();
    if (fieldMapping[normalizedField]) {
      normalizedField = fieldMapping[normalizedField];
    }

    const isCorrect = currentEmail.Errors.some((error) => {
      const errorType = error.ErrorType.toLowerCase();
      const errorField = error.ErrorField.toLowerCase();

      // Check exact match
      if (errorType === selectedError.toLowerCase() && errorField === normalizedField) {
        return true;
      }

      // Check if the error field matches the original field (for image-0, etc.)
      return errorType === selectedError.toLowerCase() && errorField === field.toLowerCase();


    });

    if (isCorrect) {
      setMatchStatus("match found");
      setAccuracyScore((prev) => Math.min(prev + 20, 100)); // Reward for correct match

      // Permanently disable the field for all error types
      setPermanentlyDisabledFields((prev) => [...prev, field]);

      setFieldHighlights((prev) => ({
        ...prev,
        [field]: "correct",
      }));

      // Increment found errors and check if all errors are found
      const newFoundErrors = foundErrorsInCurrentEmail + 1;
      setFoundErrorsInCurrentEmail(newFoundErrors);

      // Increment the global counter for correctly identified errors
      setCorrectlyIdentifiedErrors((prev) => prev + 1);

      // Enable Next button if all errors in current email are found
      if (newFoundErrors >= currentEmail.Errors.length) {
        setIsSendDisabled(false);
      }
    } else {
      setMatchStatus("no match found");
      setAccuracyScore((prev) => Math.max(prev * 0.9, 0)); // Penalty for incorrect match

      // Temporarily disable the field for this error type
      setTemporarilyDisabledFields((prev) => ({
        ...prev,
        [selectedError]: [...(prev[selectedError] || []), field],
      }));

      setFieldHighlights((prev) => ({
        ...prev,
        [field]: "incorrect",
      }));
    }
  };

  const handleNextEmail = () => {
    if (currentEmailIndex < emails.length - 1) {
      setCurrentEmailIndex((prevIndex) => prevIndex + 1);
      setSelectedError(null); // Reset the selected error
      setMatchStatus(null); // Clear the match status popup
      setAttemptedFields({}); // Clear attempts for the next email
      setFieldHighlights({}); // Reset field highlights for the next email
      setPermanentlyDisabledFields([]); // Clear permanently disabled fields
      setTemporarilyDisabledFields({}); // Clear temporarily disabled fields
      setFoundErrorsInCurrentEmail(0); // Reset found errors counter
      setIsSendDisabled(true); // Disable Next button for new email
    } else {
      setIsCompletePopupVisible(true); // Show the completion popup when all emails are done
    }
  };

  const currentEmail = emails[currentEmailIndex];

  return (

    <div className="app-container">
      <div className="points-counter">
        {isCompletePopupVisible && (
            <CompletionPopup
                onClose={() => {
                  setIsCompletePopupVisible(false);
                  window.location.href = "/"; // Redirect to main page
                }}
                totalErrors={totalErrors}
                correctlyIdentifiedErrors={correctlyIdentifiedErrors}
            />
        )}
        Accuracy Score: {accuracyScore.toFixed(1)}%
      </div>
      <Sidebar
        criteria={[
          "Sender's Email Address",
          "Urgency",
          "Threat",
          "Suspicious Links",
          "Grammar Errors",
          "Asking for Sensitive Information",
          "Suspicious Attachments",
          "Fake Branding",
          "Suspicious Content",
          "Mismatched Content",
        ]}
        onSelect={handleSelection}
      />
      <div className="content-container">
        {currentEmail ? (
            <Email
                email={{
                  from: currentEmail.EmailSender,
                  to: currentEmail.EmailReceiver,
                  header: currentEmail.Header,
                  body: currentEmail.Body,
                  images: currentEmail.Images,
                }}
                onFieldClick={handleFieldClick}
                selectedError={selectedError}
                permanentlyDisabledFields={permanentlyDisabledFields}
                temporarilyDisabledFields={temporarilyDisabledFields}
                fieldHighlights={fieldHighlights}
            />
        ) : (
          <p>Loading emails...</p>
        )}
        <Controls
            on_click={handleNextEmail}
            onSend={handleNextEmail}
            isSendDisabled={isSendDisabled}
        />
        <div className="error-counter">
          Errors Found: {foundErrorsInCurrentEmail}/{currentEmail?.Errors?.length || 0}
        </div>
      </div>
      {matchStatus && (
        <div
          className={`popup ${
            matchStatus === "match found" ? "success" : "error"
          }`}
        >
          {matchStatus === "match found" ? "Match Found" : "No Match Found"}
        </div>
      )}
    </div>

  );
}

function CompletionPopup({ onClose, totalErrors, correctlyIdentifiedErrors }) {
  return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h1>Congratulations!</h1>
          <p>You have completed all the emails level.</p>
          <p>
            Correctly Identified Errors: {correctlyIdentifiedErrors} / {totalErrors}
          </p>
          <button className="popup-button" onClick={onClose}>
            Back to Main Page
          </button>
        </div>
      </div>
  );
}

export default EmailInspection;
