import React, { useState, useRef, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import NoImage from "../../images/NoImage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Select = (props) => {
  const url = `${pansophy_data.api_url}wprk/v1/general`;
  const inputRef = useRef(null);
  const mediaUrl = `${pansophy_data.api_url}wprk/v1/media`;
  const [avatar, setAvatar] = useState(null);
  const [logo, setLogo] = useState(null);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(null);
  const [assistant, setAssistant] = useState(null);
  const handleOpenFileInput = () => {
    inputRef.current.click();
  };

  const getFile = async (file) => {
    console.log(file)
    const fileMb=file.size / 1024 ** 2
    if(fileMb<=2){ 
      let data = new FormData();
      data.append("upload_media", file);
      const res = await axios.post(mediaUrl, data);
      props.setValue(res.data.media_url);
    }
    else{
      toast.warning("Image Size should be less than 2MB!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        theme: "light",
      });
    }
   
  };
  const getAPIData = async () => {
    try {
      const res = await axios.get(url);
    
      if(props.name==='responses_avatar'){
        setFile(res.data.responses_avatar);
      }
      else if(props.name==='logo'){
        setFile(res.data.logo);
      }
      else if(props.name==='assistant_mode_icon'){
        setFile(res.data.assistant_mode_icon);
      }
      else if(props.name==='content_mode_icon'){
        setFile(res.data.content_mode_icon);
      }
      else if(props.name==='dall_logo'){
        setFile(res.data.dall_logo);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <div>
      <label
        htmlFor={props.name}
        className="flex text-xs font-medium text-white"
      >
        {props.label}

        {props?.additional?.label && props?.additional?.url && (
          <a
            href={props?.additional?.url}
            target="_blank"
            className="ml-auto font-medium text-xs text-app-blue hover:text-app-blue hover:underline"
          >
            {props.additional.label}
          </a>
        )}
      </label>
      <div className="flex flex-col sm:flex-row space-y-4 md:items-end md:space-y-0 md:space-x-4">
        <div className="mt-3.5 flex flex-col sm:flex-row  sm:items-center p-2 pl-4 w-full border border-app-border rounded-lg text-text-300">
          <input
            type="file"
            ref={inputRef}
            name={props.name}
            id={props.name}
            // required
            onChange={(e) => {
              console.log(e.target.files[0]);
              getFile(e.target.files[0]);
              setFile(URL.createObjectURL(e.target.files[0]));            }}
            // value={props.value}
            className="hidden"
            {...props?.options}
          />
          <span className="font-light text-base">{props?.fileLabel}</span>

          <div className="ml-auto space-x-4 w-full sm:w-auto">
            <span className="italic">
              {__("Recommended size 200x200", "pansophy")}
            </span>
            <button
              type="button"
              onClick={handleOpenFileInput}
              className="py-3 px-6 bg-app-blackish border border-app-border rounded-lg text-sm text-white hover:bg-app-black/80"
            >
              {__("Browse", "pansophy")}
            </button>
          </div>
        </div>
        <figure className="relative min-w-[70px] w-[70px] h-[70px] rounded-lg">

          <img
            src={file ? file :NoImage}
            alt={__("Uploaded Image", "pansophy")}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          />
          <ToastContainer/>
        </figure>
      </div>
    </div>
  );
};

export default Select;
