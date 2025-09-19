// frontend/src/App.jsx
import React, { useState } from "react";
import axios from "axios";
import InvoicePage from "./comp/show";
function App() {
  const [emails, setEmails] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  // Handle login
  const handleLogin = () => {
    window.location.href = "https://gmailinvoice.onrender.com/email/auth";
  };

  // Fetch emails
  const handleFetchEmails = async () => {
    try {
      const res = await axios.get("https://gmailinvoice.onrender.com/email/emails", {
        withCredentials: true,
      });
      setEmails(res.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Detect if user just logged in
  React.useEffect(() => {
    if (window.location.search.includes("auth=success")) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold bg-amber-200">Email Fetcher</h1>

      {!authenticated ? (
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>Login with Google</button>
      ) : (
        <>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleFetchEmails}>Fetch Emails</button>
          <ul>
  {emails.map((email) => (
    <li key={email.id}>
      <br />
      <InvoicePage data={email} />
      {console.log(email)}
    </li>
  ))}
</ul>
        </>
      )}
    </div>
  );
}

export default App;
