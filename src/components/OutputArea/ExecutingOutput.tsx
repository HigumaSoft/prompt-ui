import React, { useState } from "react";
import { usePrompt } from "../../context";
import { CommandWithOutput } from "../../types";
import Command from "./Command";
import CommandOutput from "./CommandOutput";

const ExecutingOutput: React.FC = () => {
  const { setCall } = usePrompt();
  const [output, setOutput] = useState<CommandWithOutput | null>(null);
  if (setCall) setCall(setOutput);
  console.log(output);
  return (
    <>
      {output && (
        <article>
          <Command {...output.command} />
          <CommandOutput output={output.output} />
        </article>
      )}
    </>
  );
};

export default ExecutingOutput;
