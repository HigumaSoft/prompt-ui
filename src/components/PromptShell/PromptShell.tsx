import React, { useEffect, useRef } from "react";
import Output from "../OutputArea/Output";
import CommandLine from "../CommandLine";
import { usePrompt } from "../../context";

const PromptShell: React.FC = () => {
  const {
    setCommandLineActive,
    setCaretAtPosition,
    caretPosition,
    setCaretPosition,
    setIsMouseDown,
    inputRef,
  } = usePrompt();
  const promptShellRef = useRef<HTMLDivElement>(null);
  const handleMouseDownHandler = (event: MouseEvent) => {
    const clickedInsidePromptShell = promptShellRef.current?.contains(
      event.target as Node
    );
    const clickedInsideInput = inputRef.current?.contains(event.target as Node);
    if (typeof clickedInsidePromptShell === "undefined") return;
    setCommandLineActive(clickedInsidePromptShell);
    if (!clickedInsidePromptShell) return;
    setIsMouseDown(true);
    document.addEventListener("mouseup", handleMouseUp);
    if (clickedInsideInput) return;
    event.preventDefault();
    setCaretAtPosition(caretPosition);
  };

  const handleMouseUp = (event: MouseEvent) => {
    setIsMouseDown(false);
    const clickedInsideInput = inputRef.current?.contains(event.target as Node);
    if (clickedInsideInput) {
      const selection = window.getSelection();

      if (!selection) return;

      // Get the range object of the selection
      const range = selection.getRangeAt(0);

      // Get the offset of the click relative to the start of the range
      const offset = range.startOffset;
      setCaretPosition(offset);
      return;
    }
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleMouseDownHandler);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleMouseDownHandler);
    };
    // }, [commandLineActive, setCommandLineActive, caretPosition]);
  }, [caretPosition]);

  return (
    <div
      ref={promptShellRef}
      style={{
        backgroundColor: "black",
        width: "50vw",
        height: "50vh",
        color: "green",
      }}
    >
      <Output />
      <CommandLine />
    </div>
  );
};

export default PromptShell;
