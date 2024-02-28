import React from "react";
import { CaretProps } from "../../../types";
import { usePrompt } from "../../../context";

const Caret: React.FC<CaretProps> = () => {
  const { active } = usePrompt();
  return (
    active && (
      <span
        style={{
          backgroundColor: "green",
          color: "black",
        }}
      >
        {"\u00A0\u00A0"}
      </span>
    )
  );
};

export default Caret;
