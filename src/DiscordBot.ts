import { Client } from "discord.js";
import { registerCommands, registerEvents } from "./utils";
import { BaseCommand, BaseEvent } from "./utils/defs";
import Constants from "@utils/constants";
import Configurations from "@/configs";

class DiscordBot extends Client {
  readonly constants: typeof Constants = Constants;
  readonly configs: typeof Configurations = Configurations;
  events: Map<string, BaseEvent> = new Map<string, BaseEvent>();
  commands: Map<string, BaseCommand> = new Map<string, BaseCommand>();
  cache = {
    commandsExecuted: 0,
  };

  async start(): Promise<void> {
    await registerEvents(this, "../events");
    await registerCommands(this, "../commands");
    await this.login(process.env.DISCORD_APP_TOKEN);
  }
}

export default DiscordBot;
