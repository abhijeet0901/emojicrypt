import React, { useEffect, useState } from "react";
import arrow from "./assets/arrow.png";
import "./HomePage.css";

function HomePage() {
  const [activeTab, setActiveTab] = useState("encrypt");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
   };
  const emojiMapping = {
    A: "😊",
    B: "😂",
    C: "😃",
    // Add more mappings for alphanumeric characters as needed
    1: "🔴",
    2: "🔵",
    3: "🟢",
  };

  const textMapping = {
    "😊": "A",
    "😂": "B",
    "😃": "C",
    // Add more mappings for alphanumeric characters as needed
    "🔴": "1",
    "🔵": "2",
    "🟢": "3",
  };

  const handleEncryptionChange = (isDecrypt) => {
    if (isDecrypt) {
      setActiveTab("decrypt");
    } else {
      setActiveTab("encrypt");
    }
    setInputText("");
    setOutputText("");
  };

  const encryptText = () => {
    setInputText("");
    setOutputText("");

    // Clear the password input
    setPassword("");


    const localData = JSON.parse(localStorage.getItem("EmojicryptData")) || [];
    if (!password || password.trim() === "") {
      setErrorMessage("Password is required for encrypting the emoji.");
      return;
    }

    // Reset error message
    setErrorMessage("");
    let encrypted = "";
    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i].toUpperCase();
      const emoji = emojiMapping[char] || char;
      encrypted += emoji;
    }
    // Find the index of the entry with the same password
    const existingIndex = localData.findIndex(
      (entry) => Object.keys(entry)[0] === password
    );

    // If the password exists, update the entry; otherwise, add a new entry
    if (existingIndex !== -1) {
      localData[existingIndex][password] = {
        text: inputText,
        emoji: encrypted,
      };
    } else {
      localData.push({ [password]: { text: inputText, emoji: encrypted } });
    }

    setOutputText(encrypted);

    localStorage.setItem("EmojicryptData", JSON.stringify(localData));
    console.log(JSON.parse(localStorage.getItem("EmojicryptData")));
  };

  const decryptText = () => {
    setInputText("");
    setOutputText("");

    // Clear the password input
    setPassword("");

    const localData = JSON.parse(localStorage.getItem("EmojicryptData")) || [];
    let decrypted = "";
     if (!password || password.trim() === "") {
       setErrorMessage("Password is required for decrypting the emoji.");
       return;
     }

     // Reset error message
     setErrorMessage("");
    // Assuming inputText contains the password for decryption
    const passwordMatch = localData.find(
      (entry) => Object.keys(entry)[0] === password
    );

    if (passwordMatch) {
      decrypted = passwordMatch[password].text;
    } else {
      decrypted = "Invalid password or no data found.";
    }

    setOutputText(decrypted);
  };

  return (
    <div className="main">
      <h1 className="header">
        Text{" "}
        <span>
          <img
            src={arrow}
            style={{
              transform:
                activeTab === "encrypt" ? "rotate(0deg)" : "rotate(180deg)",
            }}
            alt=""
          ></img>
        </span>{" "}
        Emojis
      </h1>
      <div className="en-dec-conatiner">
        <button
          className="encryption"
          style={{
            backgroundColor: activeTab === "encrypt" ? "#333333" : "",
          }}
          onClick={() => handleEncryptionChange()}
        >
          Encrypt
        </button>
        <button
          className="decryption"
          style={{
            backgroundColor: activeTab === "decrypt" ? "#333333" : "",
          }}
          onClick={() => handleEncryptionChange(true)}
        >
          Decrypt
        </button>
      </div>
      {activeTab === "decrypt" ? (
        <div className="main-conatiner">
          <div className="text-container">
            <span className="text">1. Paste encrypted message</span>
            <textarea
              placeholder="Paste the emoji"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
          </div>
          <div className="text-container">
            <span className="text">2. Type a password</span>
            <input
              placeholder="Enter the password"
              name="textarea"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <span
              style={{ cursor: "pointer", marginLeft: "5px" }}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "👁️" : "🔒"}
            </span>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
          <div className="text-container">
            <span className="text">Decrypt Emojis</span>
            <button className="enc-btn" type="button" onClick={decryptText}>
              Decrypt message
            </button>
          </div>
        </div>
      ) : (
        <div className="main-conatiner">
          <div className="text-container">
            <span className="text">1. Type a message</span>
            <textarea
              placeholder="Write the text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
          </div>
          <div className="text-container">
            <span className="text">2. Set a password</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={{ cursor: "pointer", marginLeft: "5px" }}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "👁️" : "🔒"}
            </span>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
          <div className="text-container">
            <span className="text">Encrypt message</span>
            <button className="enc-btn" onClick={encryptText}>
              Encrypt message
            </button>
          </div>
        </div>
      )}
      <div className="result">
        <strong>{activeTab === "decrypt" ? "Decrypted Text:" : ""}</strong>{" "}
        <strong>{activeTab === "encrypt" ? "Encrypted Text:" : ""}</strong>{" "}
        {outputText}
      </div>
    </div>
  );
}

export default HomePage;
