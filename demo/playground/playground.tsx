import React from "react";
import { createRoot } from "react-dom/client";
import { PromptProvider } from "../../src/context/PromptContext";
import PromptShell from "../../src/components/PromptShell";

const prompt = document.querySelector("prompt");
if (prompt) {
  const root = createRoot(prompt);
  root.render(
    <PromptProvider>
      <PromptShell />
    </PromptProvider>
  );
}
