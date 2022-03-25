import { getRepository } from "typeorm";

import DiscordBot from "@/DiscordBot";
import { GuildEntity } from "../typeorm/entities/GuildEntity";
import { Definetions } from "..";

export class CacheManager {
  guilds = new Map<string, GuildEntity>();
  events = new Map<string, Definetions.BaseEvent>();
  commands = new Map<string, Definetions.BaseCommand>();

  constructor(
    protected client: DiscordBot,
    private _commands: Definetions.BaseCommand[],
    private _events: Definetions.BaseEvent[],
    private guildsRepository = getRepository(GuildEntity)
  ) {}

  async init(): Promise<void> {
    const savedGuilds = await this.guildsRepository.find();

    this.cacheGuilds(savedGuilds);
    this.cacheCommands(this._commands);
    this.cacheEvents(this._events);
  }

  cacheGuilds(guilds: GuildEntity[]): Map<string, GuildEntity> {
    for (const guild of guilds) {
      this.guilds.set(guild.id, guild);
    }
    return this.guilds;
  }

  cacheCommands(commands: Definetions.BaseCommand[]): Map<string, Definetions.BaseCommand> {
    for (const command of commands) {
      this.commands.set(command.name, command);
    }
    return this.commands;
  }

  cacheEvents(events: Definetions.BaseEvent[]): Map<string, Definetions.BaseEvent> {
    for (const event of events) {
      this.events.set(event.on, event);
    }
    return this.events;
  }
}
