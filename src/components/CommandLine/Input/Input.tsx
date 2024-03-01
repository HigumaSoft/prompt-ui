import React, { useState } from "react";
import { usePrompt } from "../../../context/PromptContext";
import Caret from "../Caret";

const Input: React.FC = () => {
  const {
    executeCommand,
    setCaretPosition,
    commandLineActive,
    caretPosition,
    inputRef,
    isMouseDown,
  } = usePrompt();
  const [input, setInput] = useState<string>("");

  commandLineActive && inputRef.current?.focus();

  const handleInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    const userInput = e.target.textContent || "";
    setInput(userInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isMouseDown) {
      // Prevent default behavior only when isMouseDown is true
      e.preventDefault();
    }
    switch (e.key) {
      case "Enter":
        handleInputEnd(e);
        break;
      case "ArrowUp":
        e.preventDefault();
        break;
      case "ArrowDown":
        e.preventDefault();
        break;
      default:
        e.key.length === 1 && setCaretPosition(caretPosition + 1);
    }
  };
  const handleInputEnd = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    executeCommand({ command: input });
    setInput("");
    setCaretPosition(0);
    e.currentTarget.textContent = "";
  };

  return (
    <>
      <div
        contentEditable={commandLineActive}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        style={{
          outline: "none",
          width: "auto",
          caretColor: "red",
        }}
      ></div>
      <Caret />
    </>
  );
};

export default Input;
