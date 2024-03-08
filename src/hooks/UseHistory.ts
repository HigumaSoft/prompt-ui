import { Dispatch, useReducer } from "react";
import { HistoryAction, HistoryState } from "../types";

export const initialState: HistoryState = {
  outputHistory: [],
};

export const reducer = (
  state: HistoryState,
  action: HistoryAction
): HistoryState => {
  switch (action.type) {
    case "RESET":
      return {
        ...state,
        outputHistory: [],
      };
    case "ADD_TO_OUTPUT_HISTORY":
      return {
        ...state,
        outputHistory: [...state.outputHistory,action.payload],
      };
    default:
      return state;
  }
};

export const useHistory = (): [
  state: HistoryState,
  dispatch: Dispatch<HistoryAction>
] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};
