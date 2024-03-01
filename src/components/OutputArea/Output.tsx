import React from "react";
import { OutputProps } from "../../types";
import { usePrompt } from "../../context";
import Prompt from "../CommandLine/Prompt";
import Command from "./Command";

// type Props = {}

const Output: React.FC<OutputProps> = () => {
  const { commandOutput } = usePrompt();
  return (
    <>
      {commandOutput.map(
        (record, idx) => (
          (
            <article key={`${idx}`}>
              <Prompt />
              <Command {...record.command} />
            </article>
          )
        )
      )}
    </>
  );
};

export default Output;
