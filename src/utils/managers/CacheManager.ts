import { getRepository } from "typeorm";

import DiscordBot from "@/DiscordBot";
import { GuildEntity } from "../typeorm/entities/GuildEntity";
import { BaseCommand, BaseEvent, Command } from "..";

export class CacheManager {
  guilds = new Map<string, GuildEntity>();
  events = new Map<string, BaseEvent>();
  commands = new Map<string, BaseCommand>();

  constructor(
    protected client: DiscordBot,
    private guildsRepository = getRepository(GuildEntity)
  ) {}

  async init(): Promise<void> {
    console.log("Loading cache manager...");

    const savedGuilds = await this.guildsRepository.find();

    this.cacheGuilds(savedGuilds);
    this.cacheEvents(this.client.files.events);
    this.cacheCommands(this.client.files.commands);

    console.log("Guilds, commands and events are cached");
  }

  cacheGuilds(guilds: GuildEntity[]): Map<string, GuildEntity> {
    for (const guild of guilds) {
      this.guilds.set(guild.id, guild);
    }
    return this.guilds;
  }

  cacheCommands(commands: BaseCommand[]): Map<string, BaseCommand> {
    for (const command of commands) {
      this.commands.set(command.name, command);
    }
    return this.commands;
  }

  cacheEvents(events: BaseEvent[]): Map<string, BaseEvent> {
    for (const event of events) {
      this.events.set(event.on, event);
    }
    return this.events;
  }
}
