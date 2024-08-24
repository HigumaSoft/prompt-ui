import { Dispatch } from "react";
import {
  CommandLineAction,
  CommandLineState,
  HistoryAction,
  HistoryState,
  InputAction,
  InputState,
} from "./interface";

export interface PromptContext {
  executeCommand: (command: string, callback: () => void | null) => unknown;
  call: (...args: []) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCall: (callback: any) => void;
  renderOutput: (...args: []) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRenderOutput: (callback: any) => void;
  commandLineState: CommandLineState;
  dispatchCommandLineState: Dispatch<CommandLineAction>;
  inputState: InputState;
  dispatchInputState: Dispatch<InputAction>;
  historyState: HistoryState;
  dispatchHistoryState: Dispatch<HistoryAction>;
}

export interface PromptUISettings {}

export interface CommandInterface {
  pwd?: string;
  command: string;
  args?: string[];
}

export interface OutputProps {
  output?: string[];
}

export interface CommandMap {
  [command: string]: (command: CommandInterface) => string | string[];
}

export interface CommandWithOutput {
  command: JSX.Element | null;
  output: JSX.Element | null;
}

export interface PromptProps {
  prefix?: string;
  prompt?: string;
}
export interface CaretProps {
  isActive?: boolean;
  letter?: string;
}
export interface UserInput {}
export interface OutputProps {
  output?: string[];
}
