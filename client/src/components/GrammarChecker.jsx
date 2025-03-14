import { useState, useEffect, useCallback } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const GrammarChecker = () => {
  const [text, setText] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [loading, setLoading] = useState(false);

  const checkGrammar = useCallback(async (textToCheck) => {
    if (!textToCheck.trim()) {
      setHighlightedText("");
      return;
    }

    setLoading(true);

    try {
      const idToken = await auth.currentUser.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/grammar/check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ text: textToCheck }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check grammar");
      }

      const data = await response.json();
      setHighlightedText(data.highlightedText);
    } catch (err) {
      alert(err.message || "An error occurred while checking grammar");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkGrammar(text);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [text, checkGrammar]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      {highlightedText && (
        <div className="result">
          <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
        </div>
      )}
      {loading && <div>Checking grammar...</div>}
      <div className="form-group">
        <label htmlFor="text">Enter your text:</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="6"
          required
          placeholder="Type your text here..."
        />
      </div>
    </>
  );
};

export default GrammarChecker;
