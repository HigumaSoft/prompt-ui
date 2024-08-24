import React from "react";
import { OutputProps } from "../../types";
import ExecutingOutput from "./ExecutingOutput";
import ExecutedOutput from "./ExecutedOutput";

// type Props = {}

const Output: React.FC<OutputProps> = () => {
  return (
    <>
      <ExecutedOutput />
      <ExecutingOutput />
      <br />
    </>
  );
};

export default Output;
