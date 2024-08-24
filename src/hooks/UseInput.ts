import { Dispatch, useReducer } from "react";
import { InputAction, InputState, PromptOperation } from "../types";

export const initialState: InputState = {
  caretPosition: 0,
  isActive: false,
  isLocked: false,
  beforeCaret: "",
  afterCaret: "",
};

export const reducer = (state: InputState, action: InputAction): InputState => {
  console.log(state);
  switch (action.type) {
    case "SET_CARET_POSITION":
      return { ...state, caretPosition: action.payload };
    case "SET_ACTIVE":
      return { ...state, isActive: action.payload };
    case "RESET":
      return {
        ...state,
        beforeCaret: initialState.beforeCaret,
        afterCaret: initialState.afterCaret,
        caretPosition: initialState.caretPosition,
        isLocked: initialState.isLocked,
      };
    case "HANDLE_INPUTTED_CHARACTER":
      if (state.isLocked) return state;
      const newState = handleKeydownEvent(
        state,
        action.payload,
        action.callback
      );
      return newState;
    case "LOCK":
      return { ...state, isLocked: true };
    case "UNLOCK":
      return { ...state, isLocked: false };
    default:
      return state;
  }
};

const handleKeydownEvent = (
  state: InputState,
  e: React.KeyboardEvent<HTMLDivElement>,
  callback?: (action: PromptOperation) => void
): InputState => {
  const pressedKey: string = e.key;
  const newState: InputState = { ...state };

  // todo move to utils
  const printable = /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~ ]$/.test(
    pressedKey
  );
  let preventDefault = true;

  switch (pressedKey) {
    case "Enter":
      callback!("EXECUTE");
      break;
    case "Tab":
      callback!("AUTOCOMPLETE");
      break;
    case "ArrowUp":
      break;
    case "ArrowDown":
      break;
    case "ArrowLeft":
      if (newState.caretPosition <= 0) break;
      newState.caretPosition--;
      const lastChar = newState.beforeCaret.slice(-1);
      newState.beforeCaret = newState.beforeCaret.slice(0, -1);
      newState.afterCaret = lastChar + newState.afterCaret;
      break;
    case "ArrowRight":
      if (newState.afterCaret === "") break;
      newState.caretPosition++;
      const firstChar = newState.afterCaret.slice(0, 1);
      newState.beforeCaret = newState.beforeCaret + firstChar;
      newState.afterCaret = newState.afterCaret.slice(1);
      break;
    case "Backspace":
      if (newState.caretPosition <= 0) break;
      newState.caretPosition--;
      newState.beforeCaret = newState.beforeCaret.slice(0, -1);
      break;
    default:
      if (printable) {
        newState.caretPosition++;
        newState.beforeCaret = newState.beforeCaret + pressedKey;
      } else {
        preventDefault = false;
      }
  }
  if (preventDefault) {
    e.preventDefault();
  }

  return newState;
};

export const useInput = (): [
  state: InputState,
  dispatch: Dispatch<InputAction>
] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};
