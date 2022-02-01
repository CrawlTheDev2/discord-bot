import { ActivityOptions, Client, ClientOptions } from "discord.js";
import { registerCommands, registerEvents } from "@utils/index";
import { BaseCommand, BaseEvent, ClientCache } from "@utils/defs";
import Constants from "@utils/constants";
import Configs from "@/configs";
import { getRepository } from "typeorm";
import { GuildEntity } from "./utils/typeorm/entities/GuildEntity";
import { CommandLogEntity } from "./utils/typeorm/entities/CommandLogEntity";

class DiscordBot extends Client {
  readonly constants: typeof Constants = Constants;
  readonly configs: typeof Configs = Configs;
  events: Map<string, BaseEvent> = new Map<string, BaseEvent>();
  commands: Map<string, BaseCommand> = new Map<string, BaseCommand>();
  cache: ClientCache = {
    guilds: new Map<string, GuildEntity>(),
    logs: { commandLogs: new Map<string, CommandLogEntity>() },
  };

  constructor(
    opts: ClientOptions,
    private guildsRepository = getRepository(GuildEntity),
    private commandLogsRepository = getRepository(CommandLogEntity),
  ) {
    super(opts);
  }

  async start(): Promise<void> {
    await registerEvents(this, "../events");
    await registerCommands(this, "../commands");
    await this.cacheSavedGuilds();
    await this.cacheSavedCommandLogs();
    await this.login(process.env.DISCORD_APP_TOKEN);
  }

  setPresence(activities: ActivityOptions[]) {
    this.user?.setPresence({ activities });
    console.log("Client presence has been changed");
  }

  async cacheSavedGuilds(): Promise<void> {
    const savedGuilds = await this.guildsRepository.find();

    for (const savedGuild of savedGuilds) {
      this.cache.guilds.set(savedGuild.id, savedGuild);
    }
  }

  async cacheSavedCommandLogs(): Promise<void> {
    const savedCommandLogs = await this.commandLogsRepository.find();

    for (const savedCommandLog of savedCommandLogs) {
      this.cache.logs.commandLogs.set(savedCommandLog.id, savedCommandLog);
    }
  }
}

export default DiscordBot;
