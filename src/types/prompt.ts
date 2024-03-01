export interface PromptContext {
  commandLineActive: boolean;
  setCommandLineActive: React.Dispatch<React.SetStateAction<boolean>>;
  executeCommand: (command: CommandProps) => void;
  commandOutput: CommandWithOutput[];
  setCommandOutput: React.Dispatch<React.SetStateAction<CommandWithOutput[]>>;
  caretPosition: number;
  setCaretPosition: React.Dispatch<React.SetStateAction<number>>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  setCaretAtPosition: (position: number) => void;
  isMouseDown: boolean;
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PromptUISettings {}

export interface CommandProps {
  pwd?: string;
  command: string;
  args?: string[];
}

export interface CommandWithOutput {
  command: CommandProps;
  output: string[];
}

export interface PromptProps {
  prefix?: string;
  prompt?: string;
}
export interface CaretProps {
  isActive?: boolean;
}
export interface UserInput {}
export interface OutputProps {
  output?: string[];
}
