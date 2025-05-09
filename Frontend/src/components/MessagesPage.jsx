import React, { useState } from "react";
import "../styles/MedicalPage.css";
const MessagesPage = ({ isDoctorView = false }) => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Sample message data
  const messages = {
    inbox: [
      {
        id: 1,
        sender: isDoctorView ? "John Doe" : "Dr. Samantha Freeman",
        subject: "Your test results are ready",
        preview:
          "The lab results from your recent visit are now available in your portal...",
        time: "2 hours ago",
        unread: true,
        attachments: 1,
      },
      {
        id: 2,
        sender: isDoctorView ? "Sarah Johnson" : "Billing Department",
        subject: "Payment Confirmation",
        preview:
          "We have received your payment of $50.00 for your recent visit...",
        time: "1 day ago",
        unread: false,
        attachments: 0,
      },
    ],
    sent: [
      {
        id: 3,
        recipient: isDoctorView ? "Lab Department" : "Dr. Samantha Freeman",
        subject: "Question about medication",
        preview:
          "I was wondering if I could get a refill on my prescription...",
        time: "3 days ago",
        attachments: 0,
      },
    ],
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

  const handleBackToList = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="medical-page">
      <header className="page-header">
        <h1>Messages</h1>
        <div className="action-buttons">
          <button className="btn primary">+ New Message</button>
        </div>
      </header>

      {!selectedMessage ? (
        <>
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeTab === "inbox" ? "active" : ""}`}
              onClick={() => setActiveTab("inbox")}
            >
              Inbox ({messages.inbox.filter((m) => m.unread).length})
            </button>
            <button
              className={`filter-tab ${activeTab === "sent" ? "active" : ""}`}
              onClick={() => setActiveTab("sent")}
            >
              Sent
            </button>
          </div>

          <div className="messages-list">
            {messages[activeTab].length > 0 ? (
              messages[activeTab].map((message) => (
                <div
                  key={message.id}
                  className={`message-card ${message.unread ? "unread" : ""}`}
                  onClick={() => handleMessageClick(message)}
                >
                  <div className="message-header">
                    <h3>{message.subject}</h3>
                    <span className="message-time">{message.time}</span>
                  </div>
                  <p className="message-sender">
                    {activeTab === "inbox"
                      ? `From: ${message.sender}`
                      : `To: ${message.recipient}`}
                  </p>
                  <p className="message-preview">{message.preview}</p>
                  {message.attachments > 0 && (
                    <span className="attachment-badge">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                      </svg>
                      {message.attachments} attachment
                      {message.attachments !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No messages in {activeTab}</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="message-detail-view">
          <button className="back-button" onClick={handleBackToList}>
            ← Back to messages
          </button>

          <div className="message-header">
            <h2>{selectedMessage.subject}</h2>
            <div className="message-meta">
              <p>
                <strong>{activeTab === "inbox" ? "From:" : "To:"}</strong>
                {activeTab === "inbox"
                  ? selectedMessage.sender
                  : selectedMessage.recipient}
              </p>
              <p>
                <strong>Date:</strong> {selectedMessage.time}
              </p>
            </div>
          </div>

          <div className="message-content">
            <p>Dear {isDoctorView ? "Doctor" : "Patient"},</p>
            <p>{selectedMessage.pview}</p>
            <p>Best regards,</p>
            <p>{activeTab === "inbox" ? selectedMessage.sender : "You"}</p>
          </div>

          {selectedMessage.attachments > 0 && (
            <div className="message-attachments">
              <h4>Attachments ({selectedMessage.attachments})</h4>
              <div className="attachment-item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
                <div>
                  <p>Test_Results_2023.pdf</p>
                  <p>245 KB</p>
                </div>
                <button className="btn small">Download</button>
              </div>
            </div>
          )}

          <div className="message-actions">
            <button className="btn">Reply</button>
            {activeTab === "inbox" && (
              <button className="btn secondary">Forward</button>
            )}
            <button className="btn danger">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
