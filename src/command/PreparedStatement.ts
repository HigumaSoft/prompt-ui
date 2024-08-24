import { CommandDefinition } from "../types/command";

export class PreparedStatement {
  private command: CommandDefinition;
  private command_args: string[];
  private command_flags: { [key: string]: string };

  constructor(command: CommandDefinition) {
    this.command = command;
    this.command_args = [];
    this.command_flags = {};
  }

  public set args(args: string[]) {
    this.command_args = args;
  }

  public set flags(flags: { [key: string]: string }) {
    this.command_flags = flags;
  }

  public get exec() {
    return this.command.fn(this.command_args, this.command_flags);
  }
}
