import React, {useState, useEffect} from "react";
import "./App.css";
import Sidebar from "./Sidebar/Sidebar";
import Email from "./Email/Email";
import Controls from "./Controls/Controls";

function App() {
    const [selectedError, setSelectedError] = useState(null);
    const [matchStatus, setMatchStatus] = useState(null);
    const [isSendDisabled] = useState(false);
    const [accuracyScore, setAccuracyScore] = useState(63.9);
    const [attemptedFields, setAttemptedFields] = useState({});

    const [emails, setEmails] = useState([]);
    const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
    const [fieldHighlights, setFieldHighlights] = useState({}); 

    useEffect(() => {

        const fetchEmails = async () => {
            try {
                const response = await fetch(`/data/emails_level_1.json`);
                const data = await response.json();
                setEmails(data);
                setCurrentEmailIndex(0);
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

        const currentAttempts = attemptedFields[selectedError] || [];
        if (currentAttempts.includes(field)) {
            return; 
        }

        setAttemptedFields((prev) => ({
            ...prev,
            [selectedError]: [...currentAttempts, field],
        }));

        const currentEmail = emails[currentEmailIndex];

        
        const isCorrect = currentEmail.Errors.some(
            (error) =>
                error.ErrorType.toLowerCase() === selectedError.toLowerCase() &&
                error.ErrorField.toLowerCase() === field.toLowerCase()
        );

        if (isCorrect) {
            setMatchStatus("match found");
            setAccuracyScore((prev) => Math.min(prev + 20, 100)); 

            setFieldHighlights((prev) => ({
                ...prev,
                [field]: "correct", 
            }));
        } else {
            setMatchStatus("no match found");
            setAccuracyScore((prev) => Math.max(prev * 0.90, 0)); 

            setFieldHighlights((prev) => ({
                ...prev,
                [field]: "incorrect", 
            }));
        }
    };

    const handleNextEmail = () => {
        if (currentEmailIndex < emails.length - 1) {
            setCurrentEmailIndex((prevIndex) => prevIndex + 1);
            setSelectedError(null);
            setMatchStatus(null);
            setAttemptedFields({});
        } else {
            alert("You have completed all emails for this level!");

        }
    };


    const currentEmail = emails[currentEmailIndex];

    return (
        <div className="app-container">
            <div className="points-counter">Accuracy Score: {accuracyScore.toFixed(1)}%</div>
            <Sidebar
                criteria={["Sender's Email Address", "Urgency", "Threat", "Suspicious Links", "Grammar Errors", "Asking for Sensitive Information", "Suspicious Attachments", "Fake Branding", "Suspicious Content", "Mismatched Content"]}
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
                        attemptedFields={attemptedFields}
                        fieldHighlights={fieldHighlights} 
                    />
                ) : (
                    <p>Loading emails...</p>
                )}
                <Controls
                    onBlock={handleNextEmail}
                    onSend={handleNextEmail}
                    isSendDisabled={isSendDisabled}
                />
            </div>
            {matchStatus && (
                <div className={`popup ${matchStatus === "match found" ? "success" : "error"}`}>
                    {matchStatus === "match found" ? "Match Found" : "No Match Found"}
                </div>
            )}
        </div>
    );
}

export default App;