import React, { useState } from "react";
import { usePrompt } from "../../../context/PromptContext";
import Caret from "../Caret";

const Input: React.FC = () => {
  const {
    executeCommand,
    commandLineActive,
    inputRef,
    isMouseDownRef,
    caretPositionRef,

    // isMouseDown,
  } = usePrompt();
  // const [input, setInput] = useState<string>("");
  const [beforeCaret, setBeforeCaret] = useState<string>("");
  const [afterCaret, setAfterCaret] = useState<string>("");

  // commandLineActive && inputRef.current?.focus();
  console.log("commandLineActive", commandLineActive);

  // const handleInput = (e: React.ChangeEvent<HTMLDivElement>) => {
  //   const userInput = e.target.textContent || "";
  //   setInput(userInput);
  // };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // if (isMouseDownRef.current) {
    //   // Prevent default behavior only when isMouseDown is true
    //   e.preventDefault();
    // }
    const pressedKey: string = e.key;
    console.log("pressed key", pressedKey);

    console.log("is mousedown", isMouseDownRef.current);
    const printable = /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~ ]$/.test(
      pressedKey
    );
    console.log("caret position", caretPositionRef.current);
    let preventDefault = true;

    switch (pressedKey) {
      case "Enter":
        handleInputEnd();
        break;
      case "ArrowUp":
        break;
      case "ArrowDown":
        break;
      case "ArrowLeft":
        if (caretPositionRef.current <= 0) break;
        caretPositionRef.current--;
        const lastChar = beforeCaret.slice(-1);
        setBeforeCaret((input) => input.slice(0, -1));
        setAfterCaret((input) => lastChar + input);
        break;
      case "ArrowRight":
        if (afterCaret === "") break;
        caretPositionRef.current++;
        const firstChar = afterCaret.slice(0, 1);
        setBeforeCaret((input) => input + firstChar);
        setAfterCaret(afterCaret.slice(1));
        break;
      case "Backspace":
        setBeforeCaret((input) => input.slice(0, -1));
        break;
      default:
        // e.key.length === 1 && caretPositionRef.current++;
        if (printable) {
          caretPositionRef.current++;
          setBeforeCaret((input) => input + pressedKey);
        } else {
          preventDefault = false;
        }
    }
    if (preventDefault) {
      e.preventDefault();
    }
  };
  const handleInputEnd = () => {
    executeCommand(beforeCaret + afterCaret);
    setBeforeCaret("");
    setAfterCaret("");
    caretPositionRef.current = 0;
  };

  const handleFocus = () => {
    console.log("handle focus");
  };

  return (
    // <>
    //   <span
    //     contentEditable={commandLineActive}
    //     ref={inputRef}
    //     onKeyDown={handleKeyDown}
    //     onInput={handleInput}
    //     style={{
    //       outline: "none",
    //       width: "auto",
    //       caretColor: "red",
    //       // whiteSpace: "pre-wrap", new line
    //     }}
    //   ></span>
    //   <Caret />
    // </>
    <>
      <span
        id="editable"
        ref={inputRef}
        tabIndex={0}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        style={{
          caretColor: "red",
          outline: "none",
        }}
      >
        {beforeCaret}
      </span>
      {commandLineActive && <Caret letter={afterCaret.slice(0, 1)} />}
      <span>{afterCaret}</span>
    </>
  );
};

export default Input;
