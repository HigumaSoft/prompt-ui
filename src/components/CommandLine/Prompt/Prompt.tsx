import React from "react";
import { PromptProps } from "../../../types";

const Prompt: React.FC<PromptProps> = ({ prompt = "$", prefix = "" }) => {
  return (
    <span>
      {prefix}
      {prompt}
      &nbsp;
    </span>
  );
};

export default Prompt;
