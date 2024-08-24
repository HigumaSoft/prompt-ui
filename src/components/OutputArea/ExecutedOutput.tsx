import React from "react";
import { usePrompt } from "../../context";

const ExecutedOutput: React.FC = () => {
  const { historyState } = usePrompt();
  return (
    <>
      {historyState.outputHistory.map((record, idx) => (
        <article key={`${idx}`}>
          {record.command}
          {record.output}
        </article>
      ))}
    </>
  );
};

export default ExecutedOutput;
