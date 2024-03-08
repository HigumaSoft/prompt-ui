import React, { Dispatch } from "react";
import {
  CommandLineAction,
  CommandLineState,
  InputAction,
  InputState,
} from "./interface";

export interface PromptContext {
  // commandLineActive: boolean;
  // setCommandLineActive: Dispatch<SetStateAction<boolean>>;
  executeCommand: (command: string, callback: () => void | null) => unknown;
  outputHistoryRef: React.MutableRefObject<CommandWithOutput[]>;
  inputRef: React.MutableRefObject<HTMLDivElement | null>;
  isExecutingCommandRef: React.MutableRefObject<boolean>;
  promptShellRef: React.MutableRefObject<HTMLDivElement | null>;
  caretPositionRef: React.MutableRefObject<number>;
  setCaretAtPosition: (position: number) => void;
  isMouseDownRef: React.MutableRefObject<boolean>;
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
}

export interface PromptUISettings {}

export interface CommandProps {
  pwd?: string;
  command: string;
  args?: string[];
}

export interface OutputProps {
  output?: string[];
}

export interface CommandMap {
  [command: string]: (command: CommandProps) => string | string[];
}

export interface CommandWithOutput {
  command: CommandProps;
  output: OutputProps;
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
