import { createRoot } from "react-dom/client";
import { PromptProvider } from "./context/PromptContext";
import * as React from "react";
import PromptShell from "./components/PromptShell";

const initPrompt = () => {
  const prompt = document.querySelector("prompt");
  if (!prompt) return;
  const root = createRoot(prompt);
  root.render(
    <PromptProvider>
      <PromptShell />
    </PromptProvider>
  );
};

initPrompt();
