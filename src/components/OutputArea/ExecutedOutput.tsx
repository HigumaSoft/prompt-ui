import React, { useState } from "react";
import { usePrompt } from "../../context";
import Command from "./Command";
import CommandOutput from "./CommandOutput";
import { CommandWithOutput } from "../../types";

const ExecutedOutput: React.FC = () => {
  const [executedOutput, setExecutedOutput] = useState<CommandWithOutput[]>([]);
  const { setRenderOutput } = usePrompt();
  console.log(executedOutput);
  setRenderOutput(setExecutedOutput);
  return (
    <>
      {executedOutput.map((record, idx) => (
        <article key={`${idx}`}>
          <Command {...record.command} />
          <CommandOutput output={record.output} />
        </article>
      ))}
    </>
  );
};

export default ExecutedOutput;
