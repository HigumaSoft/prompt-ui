import React, { createContext, useContext } from "react";
import { CommandInterface, CommandWithOutput, PromptContext } from "../types";
import { useSignal } from "../utils/UseSignal";
import { useCommandLine } from "../hooks/UseCommandLine";
import { useInput } from "../hooks/UseInput";
import { useHistory } from "../hooks/UseHistory";
import { CommandLineOutput, CommandOutput } from "../components/OutputArea";
import { CommandRegistry } from "../command/CommandRegistry";
import { BuildInCommands } from "../command/BuildInCommand";

const PromptContext = createContext<PromptContext | undefined>(undefined);

// const registry: CommandRegistry = new CommandRegistry(BuildInCommands);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("render prompt provider");
  const [commandLineState, dispatchCommandLineState] = useCommandLine();
  const [inputState, dispatchInputState] = useInput();
  const [historyState, dispatchHistoryState] = useHistory();

  // const setCaretAtPosition = (position: number) => {
  //   if (!inputRef.current) return;
  //   const range = document.createRange();
  //   const selection = window.getSelection();
  //   if (!selection) return;
  //   inputRef.current?.focus();
  //   const textNode = inputRef.current.firstChild;
  //   if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
  //     return;
  //   }
  //   const maxLength = textNode.nodeValue?.length || 0;

  //   position = isNaN(position)
  //     ? maxLength
  //     : Math.max(0, Math.min(position, maxLength));

  //   range.setStart(textNode, position);
  //   range.collapse(true);

  //   selection.removeAllRanges();
  //   selection.addRange(range);
  // };

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
  // const clearCommandOutput = () => {
  //   ({
  //     type: "CLEAR_COMMAND_OUTPUT",
  //   });
  //   // console.log("Clearing command output...");
  //   // setOutputHistory([]);
  //   return "";
  // };

  // const commandNotFound = (command: CommandInterface) => {
  //   return "Command not found: " + command.command;
  // };

  // const printHelp = () => {
  //   return "<span style='color: red'>help</span>";
  // };

  // const recordToHistory = () => {
  //   // const lines = [];
  //   // dispatchHistoryState({
  //   //   type: "ADD_TO_OUTPUT_HISTORY",
  //   //   payload: lines,
  //   // });
  // };

  const printHistory = (): string[] => {
    return [...commandLineState.inputHistory, "history"];
  };

  // const builtinCommands: CommandMap = {
  //   clear: clearCommandOutput,
  //   help: printHelp,
  //   history: printHistory,
  //   not_found: commandNotFound,
  // };

  const parseCommand = (command: string): CommandInterface => {
    const parts = command.split(" ");
    const commandName = parts[0] || command;
    const commandArgs = parts.slice(1);
    return {
      command: commandName,
      args: commandArgs,
    };
  };

  const printCommand = (command: CommandInterface): JSX.Element | null => {
    return <CommandLineOutput {...command} />;
  };

  const execute = (
    command: CommandInterface,
    callback: () => void
  ): JSX.Element | null => {
    console.log(command);
    const lines = printHistory();
    console.log(lines);
    // let output: unknown;
    // // if (command === "clear") {
    // //   outputHistoryRef.current.push({ command: CommandInterface, output: [] });
    // //   return;
    // // }
    // try {
    //   output = (builtinCommands[command]! || builtinCommands.not_found)(
    //     CommandInterface
    //   );
    // } catch (error) {
    //   output = "" + error;
    // }

    // const command_with_output = { command: CommandInterface, output };
    // call(command_with_output);
    callback();
    return <CommandOutput />;
  };

  const executeCommand = (input: string, callback: () => void) => {
    recordCommand(input);
    const command = parseCommand(input);
    console.log(command);
    const commandWithOutput: CommandWithOutput = {
      command: printCommand(command),
      output: null,
    };
    try {
      commandWithOutput.output = execute(command, callback);
    } catch (e) {
      console.log(e);
    } finally {
      dispatchHistoryState({
        type: "ADD_TO_OUTPUT_HISTORY",
        payload: commandWithOutput,
      });
    }
  };

  return (
    <PromptContext.Provider
      value={{
        executeCommand,
        call,
        setCall,
        renderOutput,
        setRenderOutput,
        commandLineState,
        dispatchCommandLineState,
        inputState,
        dispatchInputState,
        historyState,
        dispatchHistoryState,
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
