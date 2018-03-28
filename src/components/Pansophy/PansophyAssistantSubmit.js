import React, { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import PansophyInput from "./PansophyInput";
import PansophySelect from "./Form/PansophySelect";
import { getHistory } from "../../Store/userSlice";
import { getQuestion, getAnswer } from "../../Store/chatSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const number_of_images = [
  { id: 1, name: __("1 Image", "pansophy"), unavailable: false },
  { id: 3, name: __("3 Images", "pansophy"), unavailable: false },
  { id: 5, name: __("5 Images", "pansophy"), unavailable: false },
  { id: 10, name: __("10 Images", "pansophy"), unavailable: false },
  { id: 20, name: __("20 Images", "pansophy"), unavailable: false },
  { id: 30, name: __("30 Images", "pansophy"), unavailable: false },
];
const size_of_images = [
  {
    id: "small",
    name: __("Small - 256 x 256", "pansophy"),
    unavailable: false,
  },
  {
    id: "medium",
    name: __("Medium - 512 x 512", "pansophy"),
    unavailable: false,
  },
  {
    id: "large",
    name: __("Large - 1024 x 1024", "pansophy"),
    unavailable: false,
  },
];
const size_of_images_small = [
  { id: "small", name: __("256 x 256", "pansophy"), unavailable: false },
  { id: "medium", name: __("512 x 512", "pansophy"), unavailable: false },
  { id: "large", name: __("1024 x 1024", "pansophy"), unavailable: false },
];
const PansophyAssistantSubmit = (props) => {
  const url = `${pansophy_data.api_url}wprk/v1/settings`;
  const chatGPTUrl = `${pansophy_data.api_url}wprk/v1/plugin`;
  const [imagePrompt, setImagePrompt] = useState(false);
  const [promptValue, setPromptValue] = useState("");
  const [promptValueSize, setPromptValueSize] = useState("");
  const [promptValueImages, setPromptValueImages] = useState("");
  const dispatch = useDispatch();

  const addAPIData = async () => {
    try {
      props.getTyping(true);
      const payload = {
        question: promptValue,
      };
      dispatch(getQuestion(promptValue));
      const chatGPTres = await axios.post(chatGPTUrl, payload);
      const generatedText = await chatGPTres.data.desc;
      dispatch(getAnswer(generatedText));
      const data = {
        question: promptValue,
        answer: generatedText,
        is_image: false,
      };
      const response = await axios.post(url, data);
      const res = await axios.get(url);
      

      if (res.data == "empty tables") {
        dispatch(getHistory([]));
      } else {
        dispatch(getHistory(res.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      props.getTyping(false);
    }
  };

  const handleValue = (value) => {
    setPromptValue(value);
  };
  useEffect(() => {
    props.getImagePrompt(imagePrompt);
  }, [imagePrompt]);
  return (
    <div className={`flex flex-col items-start p-4 bg-pansophy-bgDark`}>
      <div
        className={`flex items-center justify-between w-full ${
          imagePrompt ? "pb-2 border-b border-pansophy-divider" : ""
        }`}
      >
        <PansophyInput handleValue={handleValue} />

        <div className="flex items-center space-x-2 pl-4">
          <button type="button" onClick={() => setImagePrompt(!imagePrompt)}>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${imagePrompt ? "fill-app-green" : "fill-[#3F3F46]"}`}
            >
              <path d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z" />
              <path d="M9 11.25C7.48 11.25 6.25 10.02 6.25 8.5C6.25 6.98 7.48 5.75 9 5.75C10.52 5.75 11.75 6.98 11.75 8.5C11.75 10.02 10.52 11.25 9 11.25ZM9 7.25C8.31 7.25 7.75 7.81 7.75 8.5C7.75 9.19 8.31 9.75 9 9.75C9.69 9.75 10.25 9.19 10.25 8.5C10.25 7.81 9.69 7.25 9 7.25Z" />
              <path d="M2.67002 20.2C2.43002 20.2 2.19002 20.08 2.05002 19.87C1.82002 19.53 1.91002 19.06 2.26002 18.83L7.19002 15.52C8.27002 14.79 9.76002 14.88 10.74 15.71L11.07 16C11.57 16.43 12.42 16.43 12.91 16L17.07 12.43C18.13 11.52 19.8 11.52 20.87 12.43L22.5 13.83C22.81 14.1 22.85 14.57 22.58 14.89C22.31 15.2 21.84 15.24 21.52 14.97L19.89 13.57C19.39 13.14 18.54 13.14 18.04 13.57L13.88 17.14C12.82 18.05 11.15 18.05 10.08 17.14L9.75002 16.85C9.29002 16.46 8.53002 16.42 8.02002 16.77L3.09002 20.08C2.96002 20.16 2.81002 20.2 2.67002 20.2Z" />
            </svg>
          </button>
          <button type="button">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                {
                  promptValue !== ""
                    ? !imagePrompt
                      ? addAPIData()
                      : addAPIData({
                          question: promptValue,
                          answer: `Image - ${promptValueImages.name} - ${promptValueSize.name}`,
                          is_image: true,
                        })
                    : alert("Please enter text..!");
                }
              }}
            >
              <path
                d="M7.00004 12.5H11M5.44004 4.65L20.09 11.65C20.2591 11.7319 20.4017 11.8597 20.5015 12.0189C20.6012 12.1781 20.6541 12.3621 20.6541 12.55C20.6541 12.7379 20.6012 12.9219 20.5015 13.0811C20.4017 13.2403 20.2591 13.3681 20.09 13.45L5.44004 20.45C5.24556 20.5627 5.01878 20.6066 4.79629 20.5746C4.5738 20.5426 4.36858 20.4366 4.21373 20.2737C4.05888 20.1108 3.96345 19.9004 3.94282 19.6766C3.92219 19.4527 3.97758 19.2285 4.10004 19.04L6.82004 12.91C6.87449 12.7802 6.90254 12.6408 6.90254 12.5C6.90254 12.3592 6.87449 12.2198 6.82004 12.09L4.10004 5.96C4.01743 5.77361 3.99378 5.56642 4.03224 5.3662C4.0707 5.16598 4.16944 4.9823 4.31523 4.83977C4.46101 4.69725 4.64688 4.60269 4.84792 4.56878C5.04896 4.53486 5.25556 4.5632 5.44004 4.65Z"
                stroke="#059669"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {imagePrompt && (
        <div className="grid grid-cols-2 w-full items-center mt-4 divide-x divide-pansophy-divider">
          <>
            <div className="px-2">
              <PansophySelect
                items={number_of_images}
                name="number_of_images"
                value={promptValueImages}
                setValue={setPromptValueImages}
                srOnly={true}
                absolute={true}
                toTop={true}
              />
            </div>
            <div className="px-2 md:px-4 md:w-[190px]">
              <PansophySelect
                items={size_of_images_small}
                name="size_of_images"
                srOnly={true}
                value={promptValueSize}
                setValue={setPromptValueSize}
                absolute={true}
                toTop={true}
              />
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default PansophyAssistantSubmit;
