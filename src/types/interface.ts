import { CommandWithOutput } from "./prompt";

export interface CommandLineState {
  input: string;
  isAccessible: boolean;
  inputHistory: string[];
}

export interface InputState {
  caretPosition: number;
  isLocked: boolean;
  isActive: boolean;
  beforeCaret: string;
  afterCaret: string;
}

export interface HistoryState {
  outputHistory: CommandWithOutput[];
}

export interface SetCaretAction {
  type: "SET_CARET_POSITION";
  payload: number;
}

export interface SetInputAction {
  type: "SET_INPUT";
  payload: string;
}

export interface SetActiveAction {
  type: "SET_ACTIVE";
  payload: boolean;
}

export interface ResetAction {
  type: "RESET";
}

export interface DisableCommandLine {
  type: "DISABLE";
}

export interface EnableCommandLine {
  type: "ENABLE";
}

export interface HandleInputtedCharacterAction {
  type: "HANDLE_INPUTTED_CHARACTER";
  payload: React.KeyboardEvent<HTMLDivElement>;
  callback?: () => void;
}

export interface AddToInputHistoryAction {
  type: "ADD_TO_INPUT_HISTORY";
  payload: string;
}

export interface ClearInputHistoryAction {
  type: "CLEAR_INPUT_HISTORY";
}

export interface LockInputAction {
  type: "LOCK";
}

export interface UnlockInputAction {
  type: "UNLOCK";
}

export interface AddToOutputHistoryAction {
  type: "ADD_TO_OUTPUT_HISTORY";
  payload: CommandWithOutput;
}

export type CommandLineAction =
  | ResetAction
  | SetInputAction
  | DisableCommandLine
  | EnableCommandLine
  | AddToInputHistoryAction
  | ClearInputHistoryAction;

export type InputAction =
  | SetCaretAction
  | SetActiveAction
  | ResetAction
  | HandleInputtedCharacterAction
  | LockInputAction
  | UnlockInputAction;

export type HistoryAction = ResetAction | AddToOutputHistoryAction;
