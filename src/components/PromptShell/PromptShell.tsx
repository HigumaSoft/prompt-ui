import React from "react";
import Output from "../OutputArea/Output";
import CommandLine from "../CommandLine";
import { usePrompt } from "../../context";

const PromptShell: React.FC = () => {
  const { setActive } = usePrompt();

  const setFocus = () => {
    setActive(true);
  };

  return (
    <aside
      onClick={setFocus}
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        color: "green",
      }}
    >
      <Output />
      <CommandLine />
    </aside>
  );
};

export default PromptShell;
