import React, { useState } from "react";
import { __ } from "@wordpress/i18n";

const PansophyContent = (props) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputValue = () => {
    props.handleValue(inputValue);
    setInputValue("");
  };
 

  return (
    <div className="w-full">
      <input
        type="text"
        name="keyword"
        value={inputValue}
        onBlur={handleInputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoComplete="off"
        className="pansophy-keyword-field w-full bg-transparent border-0 text-sm text-pansophy-text focus:border-0 focus:outline-0 active:border-0 active:outline-0 ountline-0"
        placeholder={__("Input prompt...", "pansophy")}
      />
    </div>
  );
};

export default PansophyContent;
