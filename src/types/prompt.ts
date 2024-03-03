import React from "react";

export interface PromptContext {
  commandLineActive: boolean;
  setCommandLineActive: React.Dispatch<React.SetStateAction<boolean>>;
  executeCommand: (command: string) => void;
  outputHistoryRef: React.MutableRefObject<CommandWithOutput[]>;
  // setOutputHistory: React.Dispatch<React.SetStateAction<CommandWithOutput[]>>;
  inputRef: React.MutableRefObject<HTMLDivElement | null>;
  promptShellRef: React.MutableRefObject<HTMLDivElement | null>;
  caretPositionRef: React.MutableRefObject<number>;
  setCaretAtPosition: (position: number) => void;
  handleMouseUp: () => void;
  isMouseDownRef: React.MutableRefObject<boolean>;
}

export interface PromptUISettings {}

export interface CommandProps {
  pwd?: string;
  command: string;
  args?: string[];
}

export interface CommandMap {
  [command: string]: (command: CommandProps) => unknown;
}

export interface CommandWithOutput {
  command: CommandProps;
  output: string[] | string | unknown;
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
