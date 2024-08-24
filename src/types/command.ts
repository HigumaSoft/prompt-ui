export interface CommandFunction {
  (args: string[], options: { [key: string]: string }): Promise<
    void | string | number | boolean | string[]
  >;
}

export interface CommandFlag {
  short: string;
  long: string;
  description: string;
}

export interface CommandDefinition {
  usage: string;
  fn: CommandFunction;
  shortDescription?: string;
  description?: string;
  args?: {
    count?: number;
    description?: {
      [key: string]: string;
    };
  };
  flags?: CommandFlag[];
  subCommands?: CommandDefinition[];
}

export interface PromptCommands {
  [key: string]: CommandDefinition;
}
