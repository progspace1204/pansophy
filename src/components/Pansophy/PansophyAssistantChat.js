import React, { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import UserMessage from "./Chat/UserMessage";
import GeneratingImagesMessage from "./Chat/GeneratingImagesMessage";
import AIImagesMessage from "./Chat/AIImagesMessage";
import AIMessageChat from "./Chat/AIMessageChat";
import AIAssistantImagesMessage from "./Chat/AIAssistantImagesMessage";
import galleryImage from "../../images/gallery_image.jpg";
import { TypeAnimation } from "react-type-animation";
import { useSelector } from "react-redux";

const PansophyAssistantChat = ({
  messages,
  image,
  typing
}) => {
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState();
  const [scroll, setScroll] = useState(0);
  const messagesEndRef = React.createRef();
  const answerRef = React.createRef();
  const question = useSelector((state) => state.chats.data.question);
  const answer = useSelector((state) => state.chats.data.answer);
  const isChatting = useSelector((state) => state.chats.data.isChatting);
  const images = [
    { id: 1, url: galleryImage },
    { id: 2, url: galleryImage },
    { id: 3, url: galleryImage },
    { id: 4, url: galleryImage },
    { id: 5, url: galleryImage },
    { id: 6, url: galleryImage },
    { id: 7, url: galleryImage },
    { id: 8, url: galleryImage },
    { id: 9, url: galleryImage },
    { id: 10, url: galleryImage },
    { id: 11, url: galleryImage },
    { id: 12, url: galleryImage },
  ];
  const getImageValue = (value) => {
    if (value) {
      setFile(images.filter((item) => item.id == value));
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    answerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [typing,scroll]);
  return (
    <div className="pansophy-app-chat flex flex-col p-4 space-y-6 bg-pansophy-bg max-h-[500px] overflow-auto">
      {messages.length == 0 ? <h4>Ask Anything...</h4> : ""}
      {messages &&
        messages.map((message,index) => {
          if (isChatting && messages.length - 1 === index && !typing) {
            return null;
          } else {
            return (
              <div className="grid gap-4" ref={messagesEndRef}>
                <div className="max-w-[80%]">
                  <UserMessage type="chat" message={message.question} />
                </div>

                <AIMessageChat message={message} />
              </div>
            );
          }
        })}
      {typing ? (
        <div>
         
          <UserMessage message={question} />
          <br />
          <AIMessageChat
            message={{
              answer: (
                <TypeAnimation
                  sequence={[".", 500, "..", 500, "...", 500]}
                  style={{ fontSize: "2em" }}
                  repeat={Infinity}
                  speed={75}
                />
              ),
              is_image: "0",
            }}
          />
        </div>
      ) : (
        ""
      )}

      {answer !== "" && !typing ? (
        <div>
          <UserMessage message={question} />
          <br />
          <AIMessageChat
            message={{
              answer: (
                <TypeAnimation
                  sequence={[
                    answer.slice(0, 20),
                    500,()=>setScroll(1),
                    answer.slice(0, 40),
                    500,()=>setScroll(2),
                    answer,
                    500,()=>setScroll(3),
                  ]}
                  style={{ fontSize: "1em" }}
                  // repeat={Infinity}
                  speed={75}
                />
              ),
              is_image: "0",
            }}
          />
        </div>
      ) : (
        ""
      )}

      {image ? (
        <>
          {loading && (
            <div className="ml-auto">
              <GeneratingImagesMessage type="chat" />
            </div>
          )}
          <AIAssistantImagesMessage getImageValue={getImageValue} />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default PansophyAssistantChat;
