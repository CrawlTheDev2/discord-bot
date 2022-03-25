import { Message } from "discord.js";
import { getRepository, Repository } from "typeorm";

import DiscordBot from "@/DiscordBot";
import { CacheManager, Deps } from "./";
import { GuildEntity } from "./typeorm/entities/GuildEntity";

export abstract class BaseEvent {
  constructor(private _on: string, private _enabled: boolean = true) {}

  abstract handle(...args: any): any;

  get on(): string {
    return this._on;
  }

  get enabled(): boolean {
    return this._enabled;
  }
}

export class CommandContext {
  constructor(
    private _client = Deps.get<DiscordBot>(DiscordBot),
    private _guildsRepository = getRepository(GuildEntity)
  ) {}

  get client(): DiscordBot {
    return this._client;
  }

  get guildsRepository(): Repository<GuildEntity> {
    return this._guildsRepository;
  }

  get cacheManager(): CacheManager {
    return this._client.cacheManager;
  }
}

export abstract class BaseCommand {
  constructor(private _name: string, private _options: CommandOptions) {}

  abstract handle(context: CommandContext, msg: Message, ...args: any): any;

  get name(): string {
    return this._name;
  }

  get options(): CommandOptions {
    return this._options;
  }
}

export interface CommandOptions {
  enabled: boolean;
  onlyStaff?: boolean;
}

export interface ClientCache {
  guilds: Map<string, GuildEntity>;
}
