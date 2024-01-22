import React, { useState } from "react";
import arrow from "./assets/arrow.png";
import "./HomePage.css";

function HomePage() {
  const [activeTab, setActiveTab] = useState("encrypt");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const emojiMapping = {
    A: "😊",
    B: "😂",
    C: "😃",
    // Add more mappings as needed
  };

  const reverseEmojiMapping = {};
  Object.keys(emojiMapping).forEach((key) => {
    reverseEmojiMapping[emojiMapping[key]] = key;
  });

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
    let encrypted = "";
    console.log(inputText);
    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i].toUpperCase();
      const emoji = emojiMapping[char] || char;
      encrypted += emoji;
    }
    setOutputText(encrypted);
  };

  const decryptText = () => {
    let decrypted = "";
    for (let i = 0; i < inputText.length; i++) {
      const emoji = inputText[i];
      const char = reverseEmojiMapping[emoji] || emoji;
      decrypted += char;
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
            <textarea
              placeholder="Enter the password"
              name="textarea"
              id=""
              cols="30"
              rows="10"
            ></textarea>
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
            <textarea
              placeholder="Create your password"
              name="textarea"
              id=""
              cols="30"
              rows="10"
            ></textarea>
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
        <strong>
          {activeTab === "decrypt" ? "Decrypted Text:" : "Encrypted Text:"}
        </strong>{" "}
        {outputText}
      </div>
    </div>
  );
}

export default HomePage;
