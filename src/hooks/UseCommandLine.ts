import { Dispatch, useReducer } from "react";
import { CommandLineState, CommandLineAction } from "../types";

export const initialState: CommandLineState = {
  input: "",
  isAccessible: true,
  inputHistory: [],
};

export const reducer = (
  state: CommandLineState,
  action: CommandLineAction
): CommandLineState => {
  switch (action.type) {
    case "SET_INPUT":
    case "RESET":
      return {
        ...state,
        input: initialState.input,
      };
    case "DISABLE":
      return {
        ...state,
        isAccessible: false,
      };
    case "ENABLE":
      return {
        ...state,
        isAccessible: true,
      };
    case "ADD_TO_INPUT_HISTORY":
      return {
        ...state,
        inputHistory: [...state.inputHistory, action.payload],
      };
    case "CLEAR_INPUT_HISTORY":
      return {
        ...state,
        inputHistory: [],
      };
    default:
      return state;
  }
};

export const useCommandLine = (): [
  state: CommandLineState,
  dispatch: Dispatch<CommandLineAction>
] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};

