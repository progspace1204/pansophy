import React, { useState, useEffect, useRef } from "react";
import { __ } from "@wordpress/i18n";
import galleryImage from "../../images/gallery_image.jpg";
import UserMessage from "./Chat/UserMessage";
import AIMessage from "./Chat/AIMessage";
import GeneratingImagesMessage from "./Chat/GeneratingImagesMessage";
import AIImagesMessage from "./Chat/AIImagesMessage";
import { useDispatch, useSelector } from "react-redux";
import AiImagesMessage from "./Chat/AIImagesMessage";
import { TypeAnimation } from "react-type-animation";
import { setChat } from "../../Store/chatSlice";

// const messages = [
//     {id: 1, ai: false, message: 'How did we start this conversation?'},
//     {
//         id: 2,
//         ai: true,
//         message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet.'
//     },
//     {id: 3, ai: false, message: 'What did we speak about after that?'},
// ];
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
const PansophyContent = ({ image, typing }) => {
  const messages = [];
  const [file, setFile] = useState();
  const [scroll, setScroll] = useState(0);
  const messagesEndRef = React.createRef();
  const componentRef = useRef(null);
  const answerRef = React.createRef();
  const history = useSelector((state) => state.users.data);
  const question = useSelector((state) => state.chats.data.question);
  const answer = useSelector((state) => state.chats.data.answer);
  const isChatting = useSelector((state) => state.chats.data.isChatting);
  const dispatch = useDispatch();
  history.map((item) => {
    messages.push(item);
  });

  const [loading, setLoading] = useState(true);

  const getImageValue = (value) => {
    setFile(images.filter((item) => item.id == value));
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    answerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [typing,scroll]);
  return (
    <div
      ref={componentRef}
      className="pansophy-app-chat flex flex-col p-4 space-y-6 bg-pansophy-bg max-h-[500px] overflow-auto"
    >
      {messages.length == 0 ? <h4>Ask Anything...</h4> : ""}

      {messages &&
        messages.map((message, index) => {
          if (isChatting && messages.length - 1 === index && !typing) {
            return null;
          } else {
            return (
              <div className="grid gap-4" ref={messagesEndRef}>
                <UserMessage message={message.question} />
                <AIMessage message={message} />
              </div>
            );
          }
        })}

      {typing && !image ? (
        <div>
          <UserMessage message={question} />
          <br />
          <AIMessage
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

{console.log(image)}
      {answer !== "" && !typing && !image ? (
        <div>
          <UserMessage message={question} />
          <br />
          <AIMessage
            message={{
              answer: (
                <TypeAnimation
                  ref={answerRef}
                  sequence={[
                    answer.slice(0, 20),
                    500,() => setScroll(1),
                    answer.slice(0, 40),
                    500,() => setScroll(2),
                    answer,
                    500,() => setScroll(3),
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
          {typing && <GeneratingImagesMessage />}
          <AIImagesMessage getImageValue={getImageValue} />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default PansophyContent;
