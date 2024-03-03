import React from "react";
import { usePrompt } from "../../context";
import Command from "./Command";
import CommandOutput from "./CommandOutput";

const ExecutedOutput: React.FC = () => {
  const { outputHistoryRef } = usePrompt();
  console.log("render executed output", outputHistoryRef.current);
  return (
    <>
      {outputHistoryRef.current?.map((record, idx) => (
        <article key={`${idx}`}>
          <Command {...record.command} />
          <CommandOutput output={record.output} />
        </article>
      ))}
    </>
  );
};

export default ExecutedOutput;
