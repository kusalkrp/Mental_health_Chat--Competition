import React, { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);

  

  const newChat = () =>{
	setLoading(false);
	setShowResults(false)
	setInput("");
    setConversationHistory([]);
}
  const onSent = async (prompt) => {
	setLoading(true);
	setShowResults(true);
	setInput(""); // Clear input field
  
	try {
	  let response;
	  let message;
	  if (prompt !== undefined) {
		message = prompt;
		response = await runChat(prompt);
		setRecentPrompt(prompt);
	  } else {
		message = input;
		setPrevPrompts((prev) => [...prev, input]);
		setRecentPrompt(input);
		response = await runChat(input);
		console.log("message:", response);
	  }
  
	  // Update conversation history with user input
	  setConversationHistory((prevHistory) => [
		...prevHistory,
		{ sender: "user", message: message },
	  ]);
  
	  // Ensure that response is an object before accessing its properties
	  if (typeof response === "object") {
		// Display the response message
		setResultData(response.response);
		// Update conversation history with bot response
		setConversationHistory((prevHistory) => [
		  ...prevHistory,
		  { sender: "bot", message: response.response },
		]);
	  } else {
		console.error("Invalid response format:", response);
	  }
	} catch (error) {
	  console.error("Error while running chat:", error);
	  // Handle error appropriately
	} finally {
	  setLoading(false);
	  setInput("");
	}
  };
 

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    input,
    setInput,
    showResults,
    loading,
    resultData,
	newChat,
    conversationHistory,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
