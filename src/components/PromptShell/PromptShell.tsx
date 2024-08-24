import React, { useEffect } from "react";
import Output from "../OutputArea/Output";
import CommandLine from "../CommandLine";
import { usePrompt } from "../../context";

const PromptShell: React.FC = () => {
  console.log("render prompt shell");
  const promptShellRef = React.useRef<HTMLDivElement>(null);
  const { dispatchInputState} = usePrompt();

  const handleMouseUp = () => {
    dispatchInputState({
      type: "UNLOCK",
    });
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownHandler = (event: MouseEvent) => {
    const clickedInsidePromptShell = promptShellRef.current?.contains(
      event.target as Node
    );
    if (typeof clickedInsidePromptShell === "undefined") return;

    dispatchInputState({
      type: "SET_ACTIVE",
      payload: clickedInsidePromptShell,
    });
    if (!clickedInsidePromptShell) return;
    dispatchInputState({
      type: "LOCK",
    });
    const promptComponents = Array.from(
      promptShellRef?.current?.children ?? []
    );
    const clickedOnChild = promptComponents.some((child) =>
      child.contains(event.target as Node)
    );
    // document.removeEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseup", handleMouseUp);
    if (clickedOnChild) return;
    event.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDownHandler);
    return () => {
      document.removeEventListener("mousedown", handleMouseDownHandler);
    };
  }, []);
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
