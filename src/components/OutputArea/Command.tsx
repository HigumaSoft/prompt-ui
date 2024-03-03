import React from "react";
import { CommandProps } from "../../types";
import Prompt from "../CommandLine/Prompt";

const Command: React.FC<CommandProps> = ({ command }) => {
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
