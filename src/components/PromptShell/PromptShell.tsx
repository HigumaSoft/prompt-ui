import React from "react";
import Output from "../OutputArea/Output";
import CommandLine from "../CommandLine";
import { usePrompt } from "../../context";

const PromptShell: React.FC = () => {
  console.log("render prompt shell");
  const { promptShellRef } = usePrompt();

  return (
    <div
      ref={promptShellRef}
      style={{
        backgroundColor: "black",
        width: "50vw",
        height: "50vh",
        color: "green",
      }}
    >
      <Output />
      <CommandLine />
    </div>
  );
};

export default PromptShell;
