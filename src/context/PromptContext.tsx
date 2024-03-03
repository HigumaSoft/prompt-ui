import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CommandMap,
  CommandProps,
  CommandWithOutput,
  PromptContext,
} from "../types";

const PromptContext = createContext<PromptContext | undefined>(undefined);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("prompt provider");
  const [commandLineActive, setCommandLineActive] = useState(false);
  // const [outputHistory, setOutputHistory] = useState<CommandWithOutput[]>([]);
  const outputHistoryRef = useRef<CommandWithOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  console.log(outputHistoryRef.current);

  // const [commandOutput, setCommandOutput] = useState<CommandWithOutput>();
  const isMouseDownRef = useRef(false);
  const caretPositionRef = useRef(0);
  const promptShellRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const setCaretAtPosition = (position: number) => {
    console.log("setCaretAtPosition", position);
    if (!inputRef.current) return;
    const range = document.createRange();
    const selection = window.getSelection();
    if (!selection) return;
    inputRef.current?.focus();
    const textNode = inputRef.current.firstChild;
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
      console.log("no text node");
      return;
    }
    const maxLength = textNode.nodeValue?.length || 0;

    position = isNaN(position)
      ? maxLength
      : Math.max(0, Math.min(position, maxLength));

    range.setStart(textNode, position);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const recordCommand = (command: string) => {
    setCommandHistory([...commandHistory, command]);
  };

  // TODO fix this, it does not work properly because useState is asynchronous
  const clearCommandOutput = () => {
    console.log("Clearing command output...");
    // setOutputHistory([]);
    return null;
  };

  const printToConsole = (command: CommandProps) => {
    console.log("Hello, world!", command);
  };

  const commandNotFound = (command: CommandProps) => {
    return "Command not found: " + command.command;
  };

  const printHelp = () => {
    return "<span style='color: red'>help</span>";
  };

  const printHistory = () => {
    return commandHistory.map((command) => {
      // const argsString = command.args ? ` ${command.args.join(" ")}` : ""
      // return `${command.command}${argsString}`
      return command;
    });
  };

  const builtinCommands: CommandMap = {
    clear: clearCommandOutput,
    hello: printToConsole,
    help: printHelp,
    history: printHistory,
    not_found: commandNotFound,
  };

  const executeCommand = (command: string) => {
    const parts = command.split(" ");
    const commandName = parts[0] || command;
    const commandArgs = parts.slice(1);
    // const { command } = commandProps;
    recordCommand(command);
    // // Parse the command
    const commandProps: CommandProps = {
      command: commandName,
      args: commandArgs,
    };

    outputHistoryRef.current.push({
      command: commandProps,
      output: builtinCommands[commandName]!(commandProps),
    });
    // let output: unknown;
    // if (command === "clear") {
    //   setOutputHistory([{ command: commandProps, output: [] }]);
    //   return;
    // }
    // try {
    //   output = (builtinCommands[command]! || builtinCommands.not_found)(
    //     commandProps
    //   );
    // } catch (error) {
    //   console.log(error);
    //   output = "" + error;
    // }

    // setOutputHistory([
    //   ...outputHistory,
    //   {
    //     command: commandProps,
    //     output,
    //   },
    // ]);
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    inputRef.current?.focus();
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownHandler = (event: MouseEvent) => {
    const clickedInsidePromptShell = promptShellRef.current?.contains(
      event.target as Node
    );
    if (typeof clickedInsidePromptShell === "undefined") return;
    setCommandLineActive(clickedInsidePromptShell);
    if (!clickedInsidePromptShell) return;
    isMouseDownRef.current = true;
    const promptComponents = Array.from(
      promptShellRef?.current?.children ?? []
    );
    const clickedOnChild = promptComponents.some((child) =>
      child.contains(event.target as Node)
    );
    document.removeEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseup", handleMouseUp);
    if (clickedOnChild) return;
    event.preventDefault();
    setCaretAtPosition(caretPositionRef.current);
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleMouseDownHandler);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleMouseDownHandler);
    };
  }, []);

  return (
    <PromptContext.Provider
      value={{
        commandLineActive,
        setCommandLineActive,
        executeCommand,
        // outputHistory,
        // setOutputHistory,
        outputHistoryRef,
        caretPositionRef,
        inputRef,
        setCaretAtPosition,
        handleMouseUp,
        isMouseDownRef,
        promptShellRef,
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
