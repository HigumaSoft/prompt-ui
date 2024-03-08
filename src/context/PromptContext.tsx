import React, { createContext, useContext, useRef } from "react";
import {
  CommandMap,
  CommandProps,
  CommandWithOutput,
  PromptContext,
} from "../types";
import { useSignal } from "../utils/UseSignal";
import { useCommandLine } from "../hooks/UseCommandLine";
import { useInput } from "../hooks/UseInput";
import { useHistory } from "../hooks/UseHistory";

const PromptContext = createContext<PromptContext | undefined>(undefined);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("render prompt provider");
  const [commandLineState, dispatchCommandLineState] = useCommandLine();
  const [inputState, dispatchInputState] = useInput();
  const [historyState, dispatchHistoryState] = useHistory();
  const outputHistoryRef = useRef<CommandWithOutput[]>([]);

  // const [commandOutput, setCommandOutput] = useState<CommandWithOutput>();
  const isExecutingCommandRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const caretPositionRef = useRef(0);
  const promptShellRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // const currentOutputRef = useRef<CommandWithOutput | null>(null);
  const setCaretAtPosition = (position: number) => {
    if (!inputRef.current) return;
    const range = document.createRange();
    const selection = window.getSelection();
    if (!selection) return;
    inputRef.current?.focus();
    const textNode = inputRef.current.firstChild;
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
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

  const recordCommand = (userInput: string) => {
    dispatchCommandLineState({
      type: "ADD_TO_INPUT_HISTORY",
      payload: userInput,
    });
  };

  // Example usage:
  const [call, setCall] = useSignal();
  const [renderOutput, setRenderOutput] = useSignal();

  // TODO fix this, it does not work properly because useState is asynchronous
  const clearCommandOutput = () => {
    ({
      type: "CLEAR_COMMAND_OUTPUT",
    });
    // console.log("Clearing command output...");
    // setOutputHistory([]);
    return "";
  };

  const commandNotFound = (command: CommandProps) => {
    return "Command not found: " + command.command;
  };

  const printHelp = () => {
    return "<span style='color: red'>help</span>";
  };

  const recordToHistory = () => {
    // const lines = [];
    // dispatchHistoryState({
    //   type: "ADD_TO_OUTPUT_HISTORY",
    //   payload: lines,
    // });
  };

  const printHistory = () => {
    return [...commandLineState.inputHistory, "history"];
  };

  const builtinCommands: CommandMap = {
    clear: clearCommandOutput,
    help: printHelp,
    history: printHistory,
    not_found: commandNotFound,
  };

  const parseCommand = (command: string): CommandProps => {
    const parts = command.split(" ");
    const commandName = parts[0] || command;
    const commandArgs = parts.slice(1);
    return {
      command: commandName,
      args: commandArgs,
    };
  };

  const executeCommand = (command: string, callback: () => void) => {
    recordCommand(command);

    const commandProps = parseCommand(command);
    let output: unknown;
    // if (command === "clear") {
    //   outputHistoryRef.current.push({ command: commandProps, output: [] });
    //   return;
    // }
    try {
      output = (builtinCommands[command]! || builtinCommands.not_found)(
        commandProps
      );
    } catch (error) {
      output = "" + error;
    }

    const command_with_output = { command: commandProps, output };
    call(command_with_output);
    callback();
  };

  return (
    <PromptContext.Provider
      value={{
        executeCommand,
        outputHistoryRef,
        caretPositionRef,
        inputRef,
        setCaretAtPosition,
        isMouseDownRef,
        isExecutingCommandRef,
        promptShellRef,
        call,
        setCall,
        renderOutput,
        setRenderOutput,
        commandLineState,
        dispatchCommandLineState,
        inputState,
        dispatchInputState,
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
