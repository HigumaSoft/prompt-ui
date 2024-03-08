import React from "react";

import Input from "./Input";
import { usePrompt } from "../../context";
import Prompt from "../Prompt";

// type Props = {}

const CommandLine = () => {
  // const [isInputActive, setIsInputActive] = useState(true);
  const { commandLineState } = usePrompt();

  return (
    commandLineState.isAccessible && (
      <div
        style={{
          backgroundColor: "transparent",
          display: "inline",
          position: "relative",
          overflowWrap: "break-word",
        }}
      >
        <Prompt />
        <Input />
      </div>
    )
  );
};

export default CommandLine;
