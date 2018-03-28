import React, { useState } from "react";
import { __ } from "@wordpress/i18n";
import avatar from "../../../images/avatar.svg";

const UserMessage = ({ type, message }) => {
  return (
    <div
      className={`flex ${type && type === "chat" ? "space-x-2" : "space-x-4"}`}
    >
      <figure className="relative min-w-[32px] w-8 h-8 rounded-full">
        <img
          src={avatar}
          alt={__("User Avatar", "pansophy")}
          className="absolute w-full h-full object-cover"
        />
      </figure>

      <div
        className={`self-center text-white ${
          type && type === "chat"
            ? "p-2 rounded-lg rounded-tl-none bg-app-green/10 leading-6 text-xs"
            : "leading-7 text-sm"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default UserMessage;
