import React from "react";
import { CommandProps } from "../../types";

const Command: React.FC<CommandProps> = ({ command }) => {
  return <span>{command}</span>;
};

export default Command;
