import React from "react";
import { CaretProps } from "../../../types";

const Caret: React.FC<CaretProps> = ({ letter }) => {
  return (
    <span
      style={{
        backgroundColor: "green",
        color: "black",
        zIndex: 10,
        position: "absolute",
      }}
    >
      {letter || "\u00A0\u00A0"}
    </span>
  );
};

export default Caret;
