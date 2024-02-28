import React, { useEffect, useRef, useState } from "react";
import { usePrompt } from "../../../context/PromptContext";
import Caret from "../Caret";

const Input: React.FC = () => {
  const { active, setActive, executeCommand } = usePrompt();
  const [input, setInput] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  active && inputRef.current?.focus();

  const focusLoose = () => {
    setActive(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    const userInput = e.target.textContent || "";
    setInput(userInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
    }
  };
  const handleInputEnd = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    executeCommand({ command: input });
    setInput("");
    e.currentTarget.textContent = "";
  };

  useEffect(() => {
    if (active) {
      inputRef.current?.focus();
    }
  }, [active]);

  return (
    <>
      <div
        contentEditable
        ref={inputRef}
        onBlur={focusLoose}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        style={{
          outline: "none",
          width: "auto",
          caretColor: "transparent",
        }}
      ></div>
      <Caret />
    </>
  );
};

export default Input;
