import React from "react";
import { CommandProps } from "../../types";
import Prompt from "../Prompt";
const CommandLineOutput: React.FC<CommandProps> = ({ command, args }) => {
  return (
    <div
      style={{
        backgroundColor: "transparent",
        display: "inline",
        position: "relative",
        overflowWrap: "break-word",
      }}
    >
      <Prompt />
      {command} {args ? ` ${args.join(" ")}` : ""}
    </div>
  );
};

export default CommandLineOutput;
