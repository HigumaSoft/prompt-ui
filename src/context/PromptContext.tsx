import React, { createContext, useContext, useRef, useState } from "react";
import { CommandProps, CommandWithOutput, PromptContext } from "../types";

const PromptContext = createContext<PromptContext | undefined>(undefined);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [commandLineActive, setCommandLineActive] = useState(false);
  const [commandOutput, setCommandOutput] = useState<CommandWithOutput[]>([]);
  const [caretPosition, setCaretPosition] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const setCaretAtPosition = (position: number) => {

    if (!inputRef.current) return;
    const range = document.createRange();
    const selection = window.getSelection();
    if (!selection) return;
    inputRef.current?.focus();
    const textNode = inputRef.current.firstChild;
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;
    const maxLength = textNode.nodeValue?.length || 0;

    position = Math.max(0, Math.min(position, maxLength));

    range.setStart(textNode, position);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const executeCommand = (command: CommandProps) => {
    console.log(command);
    switch (command) {
      default:
        setCommandOutput([...commandOutput, { command, output: [] }]);
    }
  };

  return (
    <PromptContext.Provider
      value={{
        commandLineActive,
        setCommandLineActive,
        executeCommand,
        commandOutput,
        setCommandOutput,
        caretPosition,
        setCaretPosition,
        inputRef,
        setCaretAtPosition,
        isMouseDown,
        setIsMouseDown,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompt = () => {
  const context = useContext(PromptContext);
  if (context === undefined) {
    throw new Error("usePrompt must be used within a PromptProvider");
  }
  return context;
};
