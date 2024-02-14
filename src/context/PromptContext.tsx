import React, { createContext, useContext, useMemo, useState } from "react";
import { PromptContext } from "../types";

const PromptContext = createContext<PromptContext | undefined>(undefined);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [active, setActive] = useState(false);

  return (
    <PromptContext.Provider
      value={{
        active,
        setActive
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export const useTerminal = () => {
  const context = useContext(PromptContext);
  if (context === undefined) {
    throw new Error("usePrompt must be used within a PromptProvider");
  }
  return context;
};
