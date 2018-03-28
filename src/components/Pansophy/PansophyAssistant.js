import React, { useState } from "react";
import { __ } from "@wordpress/i18n";
import illustration from "../../images/illustration.svg";
import PansophyAssistantSubmit from "./PansophyAssistantSubmit";
import PansophyAssistantChat from "./PansophyAssistantChat";
import { useSelector } from "react-redux";

const messages = [];

const PansophyAssistant = ({ onClose }) => {
  var history = useSelector((state) => state.users.data);
  const [image, setImage] = useState(false);
  const [typing, setTyping] = useState(false);
  const getImagePrompt = (imagePrompt) => {
    setImage(imagePrompt);
  };
  const getTyping = (typing) => {
    setTyping(typing);
  };
 
  const [assistantView, setAssistantView] = useState("small");

  return (
    <div className="pansophy-app-assistant fixed bottom-0 left-0 md:left-auto md:right-40 w-full md:w-[500px] rounded-t-xl flex flex-col bg-pansophy-bgDark z-[99]" onBlur={()=>console.log("onblur")}>
      {assistantView === "small" && (
        <div className="flex items-center justify-between p-4" onClick={() => setAssistantView("big")}>
          <button
            type="button"
            className="flex items-center space-x-2"
          >
            <div className="flex items-center justify-center p-3 w-[50px] h-[50px] bg-pansophy-bg rounded-full">
              <img src={illustration} alt="Pansophy Logo" />
            </div>
            <span className="text-sm text-white">Pansophy</span>
          </button>

          <button
            type="button"
            onClick={() => onClose()}
            className="text-app-green"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {assistantView === "big" && (
        <div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-[65px] h-[65px] bg-app-green rounded-full">
                <img src={illustration} alt="Pansophy Logo" />
              </div>
              <div className="flex flex-col text-white">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">
                    {__("Hi there 👋", "pansophy")}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div>
                    <svg
                      width="8"
                      height="9"
                      viewBox="0 0 8 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="4" cy="4.5" r="4" fill="#6EE7B7" />
                    </svg>
                  </div>
                  <span>Will reply straight away!</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAssistantView("small")}
              className="p-2 text-app-green"
            >
              <svg
                width="14"
                height="2"
                viewBox="0 0 14 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 1.75H1C0.59 1.75 0.25 1.41 0.25 1C0.25 0.59 0.59 0.25 1 0.25H13C13.41 0.25 13.75 0.59 13.75 1C13.75 1.41 13.41 1.75 13 1.75Z"
                  fill="#059669"
                />
              </svg>
            </button>
          </div>
         

          <PansophyAssistantChat messages={history} image={image} typing={typing}  />
       
          <PansophyAssistantSubmit getImagePrompt={getImagePrompt} getTyping={getTyping} />
        </div>
      )}
    </div>
  );
};

export default PansophyAssistant;
