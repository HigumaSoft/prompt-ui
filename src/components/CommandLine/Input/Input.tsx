import React, { useEffect } from "react";
import { usePrompt } from "../../../context/PromptContext";
import Caret from "../Caret";

const Input: React.FC = () => {
  const {
    executeCommand,
    inputState,
    dispatchInputState,
    dispatchCommandLineState,
    inputRef,
    caretPositionRef,
  } = usePrompt();

  console.log("render input");
  const resetCommandLine = () => {
    console.log("reset command line");

    dispatchCommandLineState({
      type: "RESET",
    });
    dispatchInputState({
      type: "SET_ACTIVE",
      payload: true,
    });
    caretPositionRef.current = 0;
  };

  const setStateAfterExecution = () => {
    console.log("set state after execution");
    dispatchCommandLineState({
      type: "ENABLE",
    });
    resetCommandLine();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    dispatchInputState({
      type: "HANDLE_INPUTTED_CHARACTER",
      payload: e,
      callback: handleInputEnd,
    });
  };
  const handleInputEnd = () => {
    dispatchInputState({
      type: "SET_ACTIVE",
      payload: false,
    });
    dispatchCommandLineState({
      type: "DISABLE",
    });
    dispatchInputState({
      type: "RESET",
    });
    executeCommand(
      inputState.beforeCaret + inputState.afterCaret,
      setStateAfterExecution
    );

    // setStateAfterExecution(setInputActive);
  };

  useEffect(() => {
    console.log("triggering focus");
    if (inputState.isActive) {
      inputRef.current?.focus();
    }
  }, [inputState.isActive]);

  return (
    <>
      <span
        id="editable"
        ref={inputRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{
          caretColor: "red",
          outline: "none",
          whiteSpace: "pre",
        }}
      >
        {inputState.beforeCaret}
      </span>
      {inputState.isActive && (
        <Caret letter={inputState.afterCaret.slice(0, 1)} />
      )}
      <span>{inputState.afterCaret}</span>
    </>
  );
};

export default Input;
