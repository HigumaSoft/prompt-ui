import * as ReactDOM from "react-dom";
import { PromptProvider } from "./context/PromptContext";
import * as React from "react";
import PromptShell from "./components/PromptShell";

const initPrompt = () => {
  const prompt = document.querySelector("prompt");
  if (!prompt) return;
  ReactDOM.render(
    <PromptProvider>
      <PromptShell />
    </PromptProvider>,
    prompt
  );
};

initPrompt();
