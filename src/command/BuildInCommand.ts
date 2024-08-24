import { CommandDefinition } from "../types/command";

export const BuildInCommands: CommandDefinition[] = [
  {
    usage: "do",
    fn: async () => console.log("Doing something"),
    subCommands: [
      {
        usage: "me",
        fn: async () => console.log("Doing something to me"),
      },
      {
        usage: "you",
        fn: async () => console.log("Doing something to you"),
      },
    ],
  },
  {
    usage: "say",
    fn: async () => console.log("Saying something"),
  },
  {
    usage: "clear",
    fn: async () => console.clear(),
    shortDescription: "Clear the console",
    description: "Clear the console",
  }
];
