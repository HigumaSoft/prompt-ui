import React, { createContext, useContext, useState } from "react";
import { CommandProps, CommandWithOutput, PromptContext } from "../types";

const PromptContext = createContext<PromptContext | undefined>(undefined);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [active, setActive] = useState(false);
  const [commandOutput, setCommandOutput] = useState<CommandWithOutput[]>([]);

  const executeCommand = (command: CommandProps) => {
    console.log(command);
    switch (command) {
      default:
        setCommandOutput([...commandOutput, { command, output: [] }]);
    }
  };

  return (
    <PromptContext.Provider
      value={{
        active,
        setActive,
        executeCommand,
        commandOutput,
        setCommandOutput,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompt = () => {
  const context = useContext(PromptContext);
  if (context === undefined) {
    throw new Error("usePrompt must be used within a PromptProvider");
  }
  return context;
};
