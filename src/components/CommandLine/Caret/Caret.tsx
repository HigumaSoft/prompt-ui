import React from "react";
import { CaretProps } from "../../../types";

const Caret: React.FC<CaretProps> = ({ letter }) => {
  const EMPTY_CARET = "\u00A0\u00A0";

  const isEmpty = (letter: string | undefined): boolean => {
    return !letter || letter === " ";
  };
  return (
    <span
      style={{
        backgroundColor: "green",
        color: "black",
        zIndex: 10,
        position: "absolute",
      }}
    >
      {isEmpty(letter) ? EMPTY_CARET : letter}
    </span>
  );
};

export default Caret;
