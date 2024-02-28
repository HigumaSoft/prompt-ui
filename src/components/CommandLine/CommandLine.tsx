import React from "react";
import Prompt from "./Prompt";
import Input from "./Input";

// type Props = {}

const CommandLine = () => {
  return (
    <div
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Prompt />
      <Input />
    </div>
  );
};

export default CommandLine;
