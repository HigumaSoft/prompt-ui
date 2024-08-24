import React from "react";
import { CommandInterface } from "../../types";
import Prompt from "../Prompt";

const Command: React.FC<CommandInterface> = ({ command }) => {
  return (
    <div
      style={{
        display: "inline",
        position: "relative",
        overflowWrap: "break-word"
      }}
    >
      <Prompt />
      <span>{command}</span>
    </div>
  );
};

export default Command;
