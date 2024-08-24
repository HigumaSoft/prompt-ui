import { CommandDefinition } from "../types/command";

export class RegistryNode {
  public children: { [key: string]: RegistryNode } = {};
  public command: CommandDefinition | undefined = undefined;
  public is_end_of_word: boolean = false;
}

export class CommandRegistry {
  private root: RegistryNode = new RegistryNode();

  constructor(commands: CommandDefinition[]) {
    commands.forEach((command) => this.registerCommand(command));
  }

  private registerCommand(command: CommandDefinition) {
    this.insertCommand(command.usage, command);

    if (command.subCommands) {
      command.subCommands.forEach((subCommand) => {
        this.insertCommand(`${command.usage} ${subCommand.usage}`, subCommand);
      });
    }
  }

  private insertCommand(usage: string, definition: CommandDefinition): void {
    let node: RegistryNode = this.root;

    for (const char of usage) {
      if (char === " ") continue; // Skip spaces

      if (!node.children[char]) {
        node.children[char] = new RegistryNode();
      }

      node = node.children[char]!;
    }

    node.command = definition;
    node.is_end_of_word = true;
  }

  lookup(input: string): CommandDefinition | undefined {
    let node: RegistryNode = this.root;
    const levels = input.split(/\s+/);

    for (const level of levels) {
      for (const char of level) {
        if (!node.children[char]) {
          return undefined;
        }
        node = node.children[char]!;
      }

      // Ensure we're on the right level after parsing one word
      if (node.is_end_of_word) {
        break;
      }
    }

    return node.is_end_of_word ? node.command : undefined;
  }

  autocomplete(prefix: string): string[] {
    let node: RegistryNode = this.root;
    const levels = prefix.split(/\s+/);

    for (const level of levels) {
      for (const char of level) {
        if (!node.children[char]) {
          return [];
        }
        node = node.children[char]!;
      }
      // We don't need to check if it's the end of the word here since we're providing suggestions
    }

    return this.suggestions(levels.join(" "), node);
  }

  private suggestions(prefix: string, node: RegistryNode): string[] {
    const suggestions: string[] = [];

    if (node.is_end_of_word) {
      suggestions.push(prefix);
    }

    for (const char in node.children) {
      suggestions.push(
        ...this.suggestions(prefix + char, node.children[char]!)
      );
    }

    return suggestions;
  }

  //   public prepareStatement(input: string): PreparedStatement | undefined {
  //     const parts = input.split(/\s+/);
  //     const command_name = parts.shift() || "";
  //     if (!command_name) return undefined;
  //     const command = this.commands.find((c) => c.usage === command_name);
  //     const first_arg = parts.shift() || "";
  //     if command?.subCommands.
  //     if (!command) return undefined;
  //     return new PreparedStatement(command);
  //   }
}
