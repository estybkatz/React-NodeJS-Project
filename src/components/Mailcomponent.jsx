import React, { useState } from "react";
import axios from "axios";

const EmailSender = () => {
  const [customerEmail, setCustomerEmail] = useState("");

  const handleEmailSend = () => {
    // Make an HTTP request to your server to send the email
    axios
      .post("/send-email", { email: customerEmail })
      .then((response) => {
        console.log("Email sent successfully!", response.data);
        // Optionally, you can show a success message to the user here.
      })
      .catch((error) => {
        console.log("Error occurred while sending the email:", error.message);
        // Optionally, you can show an error message to the user here.
      });
  };

  return (
    <div>
      <input
        type="email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        placeholder="Enter customer's email"
        required
      />
      <button onClick={handleEmailSend}>Send Email</button>
    </div>
  );
};

export default EmailSender;
