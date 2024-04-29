import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";

const Main = (props) => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
    conversationHistory,
  } = useContext(Context);

  const { isAuthenticated, username, logoutButton } = props;

  if (!isAuthenticated === true) {
    return null;
  }

  const handleCardClick = (promptText) => {
    setInput(promptText);
  };
  const handleStopClick = () => {
    onSent("end"); // Send "end" prompt when stop icon is clicked
    
    
  };

  return (
    <div className="main">
      <div className="nav">
        <p>SyCoDoca</p>
        <div className="nav">
          {username ? (
            <span>Hi, {username}</span>
          ) : (
            <span>Hi, User</span>
          )}
          <img src={assets.user} alt="" />
          <div class="dropdown-content">
            <button>Profile</button>
            <button>Help</button>
            <button>Contact</button>
            {logoutButton}
          </div>
        </div>
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Hello , Patient </span>
              </p>
              <p>How Do you Feel Today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick("I need help with my mental health")
                }
              >
                <p>I need help with my mental health </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              {/* Other card components */}
			  <div
                className="card"
                onClick={() =>
                  handleCardClick("I feel bad today")
                }
              >
                <p>I feel bad today </p>
                <img src={assets.compass_icon} alt="" />
              </div>
			  <div
                className="card"
                onClick={() =>
                  handleCardClick("I think i have depression")
                }
              >
                <p>I think i have depression </p>
                <img src={assets.compass_icon} alt="" />
              </div>
			  <div
                className="card"
                onClick={() =>
                  handleCardClick("I have headaches recently ")
                }
              >
                <p>I have headaches recently </p>
                <img src={assets.compass_icon} alt="" />
              </div>
            </div>
			
          </>
        ) : (
			<div className="result">
			{/* Render conversation history */}
			{conversationHistory.map((message, index) => (
			  <div key={index} className="result-item">
				<div className={`result-title ${message.sender}`}>
				  <img src={message.sender === 'user' ? assets.user : assets.gemini_icon} alt="" />
				  <p>{message.message}</p>
				</div>
			  </div>
			))}
		  </div>	 	  
		  )}
        {/* Input field */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Hi,how can I help today?"
            />
            <div>
               
            <img src={assets.stop_icon} alt="" onClick={handleStopClick} />
              <img
                src={assets.send_icon}
                alt=""
                onClick={() => {
                  onSent();
                }}
              />
            </div>
          </div>
          <div className="bottom-info">
            <p>
            SyCoDoca may display inaccurate info, including about people,
              so double-check its responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
