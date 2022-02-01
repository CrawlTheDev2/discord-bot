import { ActivityOptions, Client, ClientOptions } from "discord.js";
import { getRepository } from "typeorm";

import { Constants, Definetions, registerCommands, registerEvents } from "@/utils";
import Configs from "@/configs";
import { GuildEntity } from "@typeorm/entities/GuildEntity";
import { CommandLogEntity } from "@typeorm/entities/CommandLogEntity";

class DiscordBot extends Client {
  readonly constants = Constants;
  readonly configs = Configs;

  events: Map<string, Definetions.BaseEvent> = new Map<string, Definetions.BaseEvent>();
  commands: Map<string, Definetions.BaseCommand> = new Map<string, Definetions.BaseCommand>();

  cache: Definetions.ClientCache = {
    guilds: new Map<string, GuildEntity>(),
    logs: { commandLogs: new Map<string, CommandLogEntity>() },
  };

  constructor(
    opts: ClientOptions,
    private guildsRepository = getRepository(GuildEntity),
    private commandLogsRepository = getRepository(CommandLogEntity)
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
